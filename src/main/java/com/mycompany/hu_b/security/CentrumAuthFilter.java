package com.mycompany.hu_b.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.*;
import java.nio.charset.StandardCharsets;

@Component
public class CentrumAuthFilter implements Filter {

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String ME_URL = "https://qquestaicentrum.nl/api/me";
    private static final String LOGIN_URL = "https://qquestaicentrum.nl/login?next=";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Lokaal testen zonder AI Centrum-login
        if ("true".equalsIgnoreCase(System.getenv("LOCAL_DEV"))) {
            chain.doFilter(request, response);
            return;
        }

        String token = getCookieValue(httpRequest, "__Secure-authjs.session-token");

        if (token == null || token.isBlank()) {
            redirectToLogin(httpRequest, httpResponse);
            return;
        }

        CentrumUser user = getUserFromCentrum(token);

        if (user == null || !hasAccess(user)) {
            redirectToLogin(httpRequest, httpResponse);
            return;
        }

        httpRequest.setAttribute("centrumUser", user);
        chain.doFilter(request, response);
    }

    private String getCookieValue(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }

    private CentrumUser getUserFromCentrum(String token) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(ME_URL))
                    .header("Cookie", "__Secure-authjs.session-token=" + token)
                    .GET()
                    .build();

            HttpResponse<String> response =
                    httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                return null;
            }

            return objectMapper.readValue(response.body(), CentrumUser.class);

        } catch (Exception e) {
            return null;
        }
    }

    private boolean hasAccess(CentrumUser user) {
        if (user.isAdmin) {
            return true;
        }

        if (user.branches != null && user.branches.contains("algemeen")) {
            return true;
        }

        return user.toolGrants != null && user.toolGrants.contains("personeelsgids");
    }

    private void redirectToLogin(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        String currentUrl = request.getRequestURL().toString();

        String encodedNext = URLEncoder.encode(
                currentUrl,
                StandardCharsets.UTF_8
        );

        response.sendRedirect(LOGIN_URL + encodedNext);
    }
}
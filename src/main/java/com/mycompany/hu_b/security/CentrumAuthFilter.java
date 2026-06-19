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

/*
Filter voor authenticatie via het Qquest AI Centrum.

Bij elk verzoek controleert deze filter of de gebruiker is ingelogd.
In productie wordt de AI Centrum-cookie gebruikt om via /api/me
 gebruikersgegevens en toegangsrechten op te halen.
*/

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

       
        String authEnabled = System.getenv("AUTH_ENABLED");
            
        // Authenticatie uitgeschakeld (zonder login)
        if (!"true".equalsIgnoreCase(authEnabled)) {
            chain.doFilter(request, response);
            return;
        }
<<<<<<< HEAD
        // Haalt de sessiecookie van het AI Centrum uit de request.
=======

        // chat zei dat dit handig zou zijn voor als er login komt
        // if (path.equals("/health")) {
        //     chain.doFilter(request, response);
        //     return;
        // }

>>>>>>> origin/hosten-voorbereiding
        String token = getCookieValue(httpRequest, "__Secure-authjs.session-token");

        // Als er geen token is, is de gebruiker niet ingelogd.
        if (token == null || token.isBlank()) {
            redirectToLogin(httpRequest, httpResponse);
            return;
        }

        CentrumUser user = getUserFromCentrum(token);

        // Als de sessie ongeldig is of de gebruiker geen toegang heeft,
        // wordt de gebruiker doorgestuurd naar de loginpagina.

        if (user == null || !hasAccess(user)) {
            redirectToLogin(httpRequest, httpResponse);
            return;
        }

        // Slaat de ingelogde gebruiker tijdelijk op in de request,
        // zodat controllers deze informatie eventueel kunnen gebruiken.
        httpRequest.setAttribute("centrumUser", user);
        chain.doFilter(request, response);
    }

    // Zoekt in alle cookies naar de cookie met de opgegeven naam.
    // Wordt gebruikt om de AI Centrum-sessiecookie op te halen.
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
    // Stuurt de ontvangen sessiecookie door naar /api/me van het AI Centrum.
    // Als de sessie geldig is, wordt de JSON-response omgezet naar CentrumUser.
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

    // Controleert of de gebruiker toegang heeft tot HU-B. Toegang is toegestaan als de gebruiker admin is, 
    // tot de branch 'algemeen' behoort, of expliciet toegang heeft via toolGrants.
    
    private boolean hasAccess(CentrumUser user) {
        if (user.isAdmin) {
            return true;
        }

        if (user.branches != null && user.branches.contains("algemeen")) {
            return true;
        }

        return user.toolGrants != null && user.toolGrants.contains("personeelsgids");
    }

    // Stuurt de gebruiker naar de loginpagina van het AI Centrum.
    // De huidige URL wordt meegegeven als 'next', zodat de gebruiker na het inloggen terugkomt op HU-B.
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
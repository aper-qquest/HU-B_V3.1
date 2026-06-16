package com.mycompany.hu_b;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Spring Boot werkt!";
    }

    @GetMapping("/api/test")
    public String test() {
        return "Backend werkt";
    }

    // @GetMapping("/api/chat")
    // public String chat() {
    //     return "Chat API werkt";
    // }
}
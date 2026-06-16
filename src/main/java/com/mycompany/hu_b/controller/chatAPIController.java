package com.mycompany.hu_b.controller;

import com.mycompany.hu_b.service.ChatbotAntwoord;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class chatAPIController {

    private final ChatbotAntwoord chatbot;

    public chatAPIController(ChatbotAntwoord chatbot) {
        this.chatbot = chatbot;
    }

    @GetMapping
    public String test() {
        return "Chat API werkt";
    }

    @PostMapping
    public String chat(@RequestBody String question) throws Exception {
        return chatbot.ask(question);
    }
}
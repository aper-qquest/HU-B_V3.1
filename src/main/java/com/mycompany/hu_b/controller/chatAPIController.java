package com.mycompany.hu_b.controller;

import com.mycompany.hu_b.service.ChatbotAntwoord;
import org.springframework.web.bind.annotation.*;


/*
 * REST-controller voor de chatbot API.
 *
 * Verwerkt HTTP-verzoeken van de frontend en stuurt gebruikersvragen
 * door naar de chatbotservice. De controller biedt een testendpoint
 * om de beschikbaarheid van de API te controleren en een chatendpoint
 * voor het opvragen van chatbotantwoorden.
 */

// REST-controller voor communicatie tussen frontend en chatbot.
@RestController
@RequestMapping("/api/chat")
public class ChatAPIController {

    // Service die gebruikersvragen verwerkt.
    private final ChatbotAntwoord chatbot;

    public ChatAPIController(ChatbotAntwoord chatbot) {
        this.chatbot = chatbot;
    }

    // Testendpoint om te controleren of de API bereikbaar is.
    @GetMapping
    public String test() {
        return "Chat API werkt";
    }

    // Ontvangt een gebruikersvraag en retourneert het chatbotantwoord.
    @PostMapping
    public String chat(@RequestBody String question) throws Exception {
        return chatbot.ask(question);
    }


}
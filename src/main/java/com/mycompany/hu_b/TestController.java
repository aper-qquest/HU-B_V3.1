package com.mycompany.hu_b;

import com.mycompany.hu_b.service.PdfProcessing;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final PdfProcessing knowledgeService;

    public TestController(PdfProcessing knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    @GetMapping("/")
    public String home() {
        return "Spring Boot werkt!";
    }

    @GetMapping("/api/test")
    public String test() {
        return "Backend werkt";
    }

    @GetMapping("/api/getChunks")
    public String chunks() {
        return "Aantal chunks: " + knowledgeService.getChunks().size();
    }
}
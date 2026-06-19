package com.mycompany.hu_b;

import com.mycompany.hu_b.service.PdfProcessing;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final PdfProcessing pdfProcessing;

    public TestController(PdfProcessing knowledgeService, PdfProcessing pdfProcessing) {
        this.pdfProcessing = pdfProcessing;
    }

    @GetMapping("/api/test")
    public String test() {
        return "Backend werkt";
    }
    
    @GetMapping("/api/load")
    public String load() throws Exception {

        pdfProcessing.loadFolder("bronnen");

        return "Chunks: " + pdfProcessing.getChunks().size();
    }
}
package com.mycompany.hu_b.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;


/*
Controller voor het beschikbaar stellen van bronbestanden (PDF's)
aan de frontend via een URL.
*/

@RestController
@RequestMapping("/api/source")
public class SourceController {

    // Opent een bronbestand uit de map 'bronnen'.
    @GetMapping("/{bestand:.+}")
    public ResponseEntity<Resource> getSource(@PathVariable("bestand") String bestand) throws Exception {

        Path path = Path.of("bronnen", bestand).toAbsolutePath().normalize();

        // Controleert of het bestand bestaat.
        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path);

        // Stuurt het PDF-bestand terug naar de browser.
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    // Testendpoint om te controleren of de Source API bereikbaar is.
    @GetMapping
    public String test() {
        return "Source werkt!";
    }
}
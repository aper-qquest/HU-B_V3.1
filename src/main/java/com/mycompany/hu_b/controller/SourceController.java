package com.mycompany.hu_b.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;

/*
 * Controller voor het beschikbaar stellen van bronbestanden
 * aan de frontend via een URL.
 */
@RestController
@RequestMapping("/api/source")
public class SourceController {

    // Pad naar de bronnenmap uit application.properties
    @Value("${app.sources.path}")
    private String sourcesPath;

    @GetMapping("/{bestand:.+}")
    public ResponseEntity<Resource> getSource(
            @PathVariable("bestand") String bestand) throws Exception {

        Path path = Path.of(sourcesPath, bestand)
                .toAbsolutePath()
                .normalize();

        // Controleert of het bestand bestaat.
        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping
    public String test() {
        return "Source werkt!";
    }
}
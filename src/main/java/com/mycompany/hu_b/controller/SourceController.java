package com.mycompany.hu_b.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/source")
public class SourceController {

    @GetMapping("/{bestand:.+}")
    public ResponseEntity<Resource> getSource(@PathVariable("bestand") String bestand) throws Exception {

        Path path = Path.of("bronnen", bestand).toAbsolutePath().normalize();

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
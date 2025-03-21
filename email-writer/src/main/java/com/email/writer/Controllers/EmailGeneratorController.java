package com.email.writer.Controllers;

import com.email.writer.Entity.EmailRequest;
import com.email.writer.Service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest email){
        String response = emailGeneratorService.generateEmailReply(email);
        return ResponseEntity.ok(response);
    }
}

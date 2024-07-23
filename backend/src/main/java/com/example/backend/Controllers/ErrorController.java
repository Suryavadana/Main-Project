package com.example.backend.Controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/error")
public class ErrorController {
    @GetMapping
    public String handleError() {
        // Logic to handle the error and return an appropriate view
        return "errorPage"; // Replace with the actual name of your error page view
    }
}

package com.example.backend.Controllers;

import com.example.backend.Models.Contact;
import com.example.backend.Repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public String handleContactForm(@RequestBody Contact contact) {
        // Save contact information to the database
        contactRepository.save(contact);
        //Return a success message. Upgrade to send email or text message.
        return "Thank you for reaching out! We will get back to you soon.";
    }
}

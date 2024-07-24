//package com.example.backend;
//
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.servlet.ModelAndView;
//
//@ControllerAdvice
//public class GlobalExceptionalHandler {
//
//    @ExceptionHandler(Exception.class)
//    public ModelAndView handleException(Exception ex) {
//        ModelAndView mav = new ModelAndView();
//        mav.addObject("exception", ex);
//        mav.setViewName("errorPage"); // Ensure errorPage exists and does not cause circular view path
//        return mav;
//    }
//}
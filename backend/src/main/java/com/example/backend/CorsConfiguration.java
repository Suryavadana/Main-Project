package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {

    private final AuthenticationFilter authenticationFilter;

    @Autowired
    public CorsConfiguration(AuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationFilter)
                // Exclude intercepting requests to "/login" and "/register" endpoints
                .excludePathPatterns("/login", "/register", "/api/events");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/src/main/resources/images/")
                .addResourceLocations("/favicon.ico")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0); // Disable caching for development
    }
}

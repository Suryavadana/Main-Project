package com.example.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {

//    @Autowired
//    private JwtUtil jwtUtil;

    // Configure CORS settings to allow the React frontend to communicate with the backend
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

//    @Bean
//    public FilterRegistrationBean<JwtTokenFilter> jwtTokenAuthenticationFilter() {
//        FilterRegistrationBean<JwtTokenFilter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(new JwtTokenFilter( ));
//        registrationBean.addUrlPatterns("/api/*"); // Adjust URL patterns as needed
//        return registrationBean;
//    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//      //  registry.addInterceptor((HandlerInterceptor) jwtTokenAuthenticationFilter().getFilter())
//                .addPathPatterns("/api/**") // Apply the filter to specific endpoints
//                .excludePathPatterns("/api/public/**"); // Exclude public endpoints from JWT validation
//    }
}

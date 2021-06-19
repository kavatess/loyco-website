package ch.loyco.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "*")
@Controller
public class IndexController {
    /**
     * Forwards any unmapped paths (except those containing a period) to the client
     * {@code index.html}.
     *
     * @return forward to client {@code index.html}.
     */
    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward(HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-cache, no-store");
        return "forward:/";
    }
}
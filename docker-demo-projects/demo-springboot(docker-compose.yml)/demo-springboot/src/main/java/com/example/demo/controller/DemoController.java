package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

	@GetMapping("/")
	public String home()
	{
		System.out.println("Hello world");
		return "Hello Spring Dockerfile Demo Project";
	}
}

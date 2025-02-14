package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/user")
//@CrossOrigin(origins = {"http://localhost:4200","*"}, allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserService us;
	
	@GetMapping("/home")
	public String home()
	{
		return "User Service";
	}
	
	@PostMapping
	public User addUser(@RequestBody User user)
	{
		System.out.println("What i have received: "+user);
		return us.createUser(user);
	}
	
	@PutMapping("/{id}")
	public User updateUser(@PathVariable Long id, @RequestBody User user)
	{
		System.out.println("entering modify method "+ user);
		return us.updateUser(id, user);
	}
	
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return us.getAllUsers();
    }
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id)
	{
		System.out.println("entering getUserbyId method "+ id);
		return us.getUserById(id);
	}
	
	@DeleteMapping("/{id}")
	public User deleteUser(@PathVariable("id") Long id)
	{
		System.out.println("entering delete method "+ id);
		return us.deleteUser(id);
	}
}

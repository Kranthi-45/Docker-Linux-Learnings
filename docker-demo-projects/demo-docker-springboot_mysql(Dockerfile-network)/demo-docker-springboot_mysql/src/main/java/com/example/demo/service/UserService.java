package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.User;

@Service
public interface UserService {
	
	User createUser(User user);

	User getUserById(Long id);

	User updateUser(Long id, User user);

	User deleteUser(Long id);

	List<User> getAllUsers();

}

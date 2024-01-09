package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
        	user.setId(id); // Set the ID of the provided user object
            return userRepository.save(user);
        }
        return null; // Handle case where user with given ID doesn't exist
    }

    @Override
    public User deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userRepository.delete(user);
            return user;
        }
        return null; // Handle case where user with given ID doesn't exist
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

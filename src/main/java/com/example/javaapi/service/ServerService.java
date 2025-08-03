package com.example.javaapi.service;

import com.example.javaapi.model.ServerEntity;
import com.example.javaapi.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServerService {

    @Autowired
    private ServerRepository serverRepository;

    public ServerEntity saveServer(ServerEntity server) {
        return serverRepository.save(server);
    }
}

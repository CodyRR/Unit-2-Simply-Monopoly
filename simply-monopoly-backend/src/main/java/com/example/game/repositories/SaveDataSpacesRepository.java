package com.example.game.repositories;

import com.example.game.models.SaveDataSpaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaveDataSpacesRepository extends JpaRepository<SaveDataSpaces, Integer> {
}

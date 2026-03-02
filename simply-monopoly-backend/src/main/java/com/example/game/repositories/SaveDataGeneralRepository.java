package com.example.game.repositories;

import com.example.game.models.SaveDataGeneral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaveDataGeneralRepository extends JpaRepository<SaveDataGeneral, Integer> {
}

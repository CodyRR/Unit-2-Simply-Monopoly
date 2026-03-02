package com.example.game.repositories;

import com.example.game.models.SaveDataPlayers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaveDataPlayersRepository extends JpaRepository<SaveDataPlayers, Integer> {
}

package com.example.game.repositories;


import com.example.game.models.GameBoards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameBoardsRepository extends JpaRepository<GameBoards, Integer> {
}

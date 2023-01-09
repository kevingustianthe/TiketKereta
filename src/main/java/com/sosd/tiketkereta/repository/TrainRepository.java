package com.sosd.tiketkereta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sosd.tiketkereta.model.Train;

@Repository
public interface TrainRepository extends JpaRepository<Train, Integer> {
	@Query("select count(t) = 1 from Train t where trainNo = ?1")
	public boolean TrainExistByTrainNo(int trNo);

	@Query("select t.trainNo from Train t")
	public List<Integer> getAllTrainNo();

	@Query("select distinct t.source from Train t")
	public List<String> getTrainsources();

	@Query("select distinct t.destination from Train t")
	public List<String> getTraindestination();

	@Query("select t from Train t where source=?1 and destination = ?2")
	public List<Train> getAllTrain(String source, String destination);
}

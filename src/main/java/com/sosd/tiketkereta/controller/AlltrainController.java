package com.sosd.tiketkereta.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.sosd.tiketkereta.model.Train;
import com.sosd.tiketkereta.repository.TrainRepository;

@Controller
public class AlltrainController {

	@Autowired
	private TrainRepository trp;

	@GetMapping("/searchTrain/{source}/{dest}")
	public String gettrainlist(@PathVariable String source, @PathVariable String dest, Model model) {
		List<Train> listtrains = trp.getAllTrain(source, dest);
		model.addAttribute("trains", listtrains);

		return "JadwalKereta.html";
	}
}

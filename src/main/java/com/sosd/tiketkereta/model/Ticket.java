package com.sosd.tiketkereta.model;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;

public class Ticket {
	private static int counter = 99;
	private String pnr = "";
	private Date travelDate;
	private Train train;
	private Map<Passenger, Integer> passangers = new TreeMap<Passenger, Integer>();

	public Ticket() {
		super();
	}

	public Ticket(Date travelDate, Train train) {
		super();
		this.travelDate = travelDate;
		this.train = train;
		this.counter = counter + 1;
	}

	private double getTotal() {
		return calculateTotalTicketPrice();
	}

	public String generatePNR() {
		char sour = train.getSource().charAt(0);
		char dest = train.getDestination().charAt(0);
		@SuppressWarnings("deprecation")
		int y = Integer.parseInt(travelDate.toLocaleString().substring(8, 12));
		int m = travelDate.getMonth();
		int d = travelDate.getDate();

		String datstr = y + "" + m + "" + d;

		pnr = sour + "" + dest + "" + datstr + "_" + counter;

		return pnr;
	}

	private double calcPassengerFare(Passenger passen) {
		if (passen.getAge() <= 12) {
			return train.getTicketPrice() * 0.5;
		} else if (passen.getAge() >= 60) {
			return train.getTicketPrice() * 0.7;
		} else {
			return train.getTicketPrice();
		}
	}

	public void addPassenger(String name, int age, char gender) {
		Passenger p = new Passenger(name, age, gender);
		int fare = (int) calcPassengerFare(p);
		passangers.put(p, fare);
	}

	private double calculateTotalTicketPrice() {
		int total = 0;
		for (Integer price : passangers.values()) {
			total += price;
		}

		return (double) total;
	}

	public StringBuilder generateTicket() {
		StringBuilder tiket = new StringBuilder();

		tiket.append("PNR Number\t: " + this.getPnr() + "\n");
		tiket.append("Nomor Kereta\t: " + this.train.getTrainNo() + "\n");
		tiket.append("Nama Kereta\t: " + this.train.getTrainName() + "\n");
		tiket.append("Asal\t\t: " + this.train.getSource() + "\n");
		tiket.append("Tujuan\t\t: " + this.train.getDestination() + "\n");
		tiket.append("Tanngal Pergi\t: " + this.getTravelDate() + "\n");
		tiket.append("======================================================================\n");
		tiket.append("Nama Penumpang\t\tUmur\t\tJenis Kelamin\t\tHarga\n");
		for (Passenger p : this.getPassengers().keySet()) {
			tiket.append(p.getName() + "\t\t" + p.getAge() + "\t\t\t" + p.getGeneder() + "\t\t"
					+ this.getPassengers().get(p) + "\n");
		}
		tiket.append("======================================================================\n");
		tiket.append("Total Harga Tiket : " + this.getTotal() + "\n");

		return tiket;
	}

	public void writeTicket() throws IOException, SQLException {
		String fileticket = generatePNR();
		BufferedWriter bwr = new BufferedWriter(
				new FileWriter(new File("C:\\Users\\ASUS\\Desktop\\" + fileticket + ".txt")));

		// write contents of StringBuffer to a file
		StringBuilder sbf = generateTicket();
		bwr.write(sbf.toString());

		// flush the stream
		bwr.flush();

		// close the stream
		bwr.close();
	}

	public static int getCounter() {
		return counter;
	}

	public static void setCounter(int counter) {
		Ticket.counter = counter;
	}

	public String getPnr() {
		return pnr;
	}

	public void setPnr(String pnr) {
		this.pnr = pnr;
	}

	public Date getTravelDate() {
		return travelDate;
	}

	public void setTravelDate(Date travelDate) {
		this.travelDate = travelDate;
	}

	public Train getTrain() {
		return train;
	}

	public void setTrain(Train train) {
		this.train = train;
	}

	public Map<Passenger, Integer> getPassengers() {
		return passangers;
	}

	public void setPassengers(TreeMap<Passenger, Integer> passangers) {
		this.passangers = passangers;
	}

	@Override
	public String toString() {
		return "Ticket [travelDate=" + travelDate + ", train=" + train + "]";
	}
}

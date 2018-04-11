package drafter.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Dates {
	
	public static final String DATE_FORMAT = "dd/MM/yyyy";
	public static final String TIME_FORMAT = "HH:mm:ss";
	public static final String TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm";

	/**
	 * Transforma una fecha en String dado un patrón.
	 * 
	 * @param format Patrón con el que se va formatear la fecha.
	 * @param date Fecha que se va a formatear.
	 * @return Cadena formateada según la fecha.
	 */
	public static String fromDate(String format, Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		return formatter.format(date);
	}
	
	/**
	 * Parsea una cadena en una fecha según un patrón.
	 * 
	 * @param format Patrón que se espera que tenga la cadena que se va a parsear.
	 * @param date Cadena a parsear.
	 * @return Devuelve una fecha si el patrón coincide con la cadena o null si la cadena no admite el patrón dado.
	 */
	public static Date toDate(String format, String date) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		try {
			return formatter.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}
	
}

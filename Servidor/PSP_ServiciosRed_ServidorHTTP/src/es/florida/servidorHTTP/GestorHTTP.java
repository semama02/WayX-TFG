package es.florida.servidorHTTP;
 
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Properties;
import java.util.Scanner;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.json.JSONException;
import org.json.JSONObject;
 
import com.mysql.cj.xdevapi.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
 
public class GestorHTTP implements HttpHandler {
 
	@Override
 
	public void handle(HttpExchange httpExchange) throws IOException {
 
		// Habilitar accesos CORS (intercambio de recursos de origne cruzado) para peticiones POST, PUT y DELETE
		httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
		httpExchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		httpExchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
		if (httpExchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) { // Caso PUT y DELETE se pide antes
																			// confirmacion desde cliente
			httpExchange.sendResponseHeaders(204, -1); // Codigo Ok, no devuelve contenido, preparado para POST, PUT o
														// DELETE
			return;
		}
 
		System.out.print("Peticion recibida: Tipo ");
		String requestParamValue = null;
	    if ("GET".equalsIgnoreCase(httpExchange.getRequestMethod())) {
	        System.out.println("GET");
	        requestParamValue = handleGetRequest(httpExchange);
	        handleGetResponse(httpExchange, requestParamValue);
	    } else if ("POST".equalsIgnoreCase(httpExchange.getRequestMethod())) {
	        System.out.println("POST");
	        requestParamValue = handlePostRequest(httpExchange);
	        try {
	            handlePostResponse(httpExchange, requestParamValue);
	        } catch (ClassNotFoundException | IOException | SQLException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    } else if ("PUT".equalsIgnoreCase(httpExchange.getRequestMethod())) { 
	        System.out.println("PUT");
	        requestParamValue = handlePutRequest(httpExchange);
	        handlePutResponse(httpExchange,requestParamValue);
	    } else if ("DELETE".equals(httpExchange.getRequestMethod())) { 
	        System.out.println("DELETE");
	        requestParamValue = handleDeleteRequest(httpExchange);
	        try {
				handleDeleteResponse(httpExchange,requestParamValue);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }else {
	        System.out.println("DESCONOCIDA");
	    }
 
	}
 
	// INICIO BLOQUE REQUEST
 
	private String handleGetRequest(HttpExchange httpExchange) {
		System.out.println("Recibida URI tipo GET: " + httpExchange.getRequestURI().toString());
		return httpExchange.getRequestURI().toString().split("\\?")[1];
	}
 
	private String handlePostRequest(HttpExchange httpExchange) {
		System.out.println("Recibida URI tipo POST: " + httpExchange.getRequestBody().toString());
		InputStream is = httpExchange.getRequestBody();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader br = new BufferedReader(isr);
		StringBuilder sb = new StringBuilder();
		String line;
		try {
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return sb.toString();
	}
 
    private String handlePutRequest(HttpExchange httpExchange) {
		System.out.println("Recibida URI tipo PUT: " + httpExchange.getRequestBody().toString());
        InputStream is = httpExchange.getRequestBody();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr);
        StringBuilder sb = new StringBuilder();
        String line;
        try {
			while ((line = br.readLine()) != null) {
			    sb.append(line);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
        return sb.toString();
	}
 
	private String handleDeleteRequest(HttpExchange httpExchange) {
		System.out.println("Recibida URI tipo DELETE: " + httpExchange.getRequestBody().toString());
        InputStream is = httpExchange.getRequestBody();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr);
        StringBuilder sb = new StringBuilder();
        String line;
        try {
			while ((line = br.readLine()) != null) {
			    sb.append(line);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
        return sb.toString();
	}
 
	// FIN BLOQUE REQUEST
 
	// INICIO BLOQUE RESPONSE
 
	private void handleGetResponse(HttpExchange httpExchange, String requestParamValue) throws IOException {
 
		System.out.println("El servidor pasa a procesar la peticion GET: " + requestParamValue);
 
		OutputStream outputStream = httpExchange.getResponseBody();
		String htmlResponse = get(requestParamValue);
		httpExchange.sendResponseHeaders(200, htmlResponse.length());
		outputStream.write(htmlResponse.getBytes());
		outputStream.flush();
		outputStream.close();
		System.out.println("Devuelve respuesta HTML: " + htmlResponse);
 
	}
 
 
 
	private void handlePostResponse(HttpExchange httpExchange, String requestParamValue) throws IOException, ClassNotFoundException, SQLException {
 
		System.out.println("El servidor pasa a procesar el body de la peticion POST: " + requestParamValue);
 
		JSONObject ob = new JSONObject (requestParamValue);
		if (ob.getString("type").equals("login")) {
			if (post_name_password_exist(requestParamValue)) {
				OutputStream outputStream = httpExchange.getResponseBody();
				String htmlResponse = user_in_use;
				httpExchange.sendResponseHeaders(200, htmlResponse.length());
				outputStream.write(htmlResponse.getBytes());
				outputStream.flush();
				outputStream.close();
				System.out.println("El servidor devuelve codigo 200");
			}else {
				httpExchange.sendResponseHeaders(404, -1);
				System.out.println("El servidor devuelve codigo 404");
			}
		} else if (ob.getString("type").equals("register")) {
			create_user(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = sameUser;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}else if (ob.getString("type").equals("home_location")) {
			home_location(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = routes_location;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}else if (ob.getString("type").equals("home_type")) {
			home_typeRoutes(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = routes_type;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}else if (ob.getString("type").equals("find_name")) {
			find_name(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = find_route_name;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}else if (ob.getString("type").equals("find_location_type")) {
			find_location_type(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = find_route_location_type;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}else if (ob.getString("type").equals("create_route")) {
			create_route(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = route;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("user_routes")) {
			user_routes(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = routes_of_a_user;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("user_visited")) {
			prueba(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = x;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("user_visited_counter")) {
			visited_sites_counter(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = number;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("visited_site_add")) {
			visited_site_add(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = visited;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("isCompleted_route")) {
			isCompleted_route(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = isCompleted;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("user_by_id")) {
			user_by_id(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = user;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		} else if (ob.getString("type").equals("forgot_password")) {
			verificar_email(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = email;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}
	}
 
	private void handlePutResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
 
		System.out.println("El servidor pasa a procesar el body de la peticion PUT: " + requestParamValue);
 
		JSONObject ob = new JSONObject (requestParamValue);
 
		if (ob.getString("type").equals("update_profile")) {
			update_profile(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = profile_update;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}
 
	}
 
	private void handleDeleteResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException, ClassNotFoundException, SQLException {
 
		System.out.println("El servidor pasa a procesar el body de la peticion DELETE: " + requestParamValue);
		JSONObject ob = new JSONObject (requestParamValue);
		 
		if (ob.getString("type").equals("delete_profile")) {
			delete_profile(requestParamValue);
			OutputStream outputStream = httpExchange.getResponseBody();
			String htmlResponse = deleted_profile;
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
			outputStream.write(htmlResponse.getBytes());
			outputStream.flush();
			outputStream.close();
		}
 
	}
 
 
	public static String user_in_use = "";
	public static boolean post_name_password_exist(String name) {
		JSONObject ob = new JSONObject(name);
		Boolean bool = false;
		String userName = "";
		String password = "";
 
		if(ob.length()==3) {
			userName = ob.getString("userName");
			password = ob.getString("password");
		}
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE username=\""+ userName+"\" AND password=\""+ password+"\"");
			while (rs.next()) {
				user_in_use = ("{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"userName\": \"" + rs.getString(2) + "\", \n \t\"password\": \"" + rs.getString(3) + "\", \n \t\"email\": \"" + rs.getString(4) + "\", \n \t\"image\": \""+ rs.getString(5) + "\", \n \t\"location\": \"" + rs.getString(6) + "\", \n \t\"typeRoute\": \"" + rs.getString(7) + "\" \n} ");
				bool = true;
			}
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
		return bool;
	}
 
 
	private static Integer photo_counter = 0;
	private static String image_path = "";
 
 
	public static void format_image(String name) throws IOException, SQLException, ClassNotFoundException {
		photo_counter++;
		int nPhoto=(int) Math.floor(Math.random()*10000);
       String[] strings = name.split(",");
       String extension;
       switch (strings[0]) {//check image's extension
           case "data:image/jpeg;base64":
               extension = "jpeg";
               break;
           case "data:image/png;base64":
               extension = "png";
               break;
           default://should write cases for more images types
               extension = "jpg";
               break;
       }
       //convert base64 string to binary data
       String image = name.split(",")[1];
       byte[] data = Base64.getDecoder().decode(image);
 
       String name_photo = nPhoto +"_"+ photo_counter + "." + extension;
       String path = "C:\\xampp\\htdocs\\images\\"+name_photo;
       File file = new File(path);
       image_path = "http://85.56.203.68/images/" + name_photo;
       try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
           outputStream.write(data);
       } catch (IOException e) {
           e.printStackTrace();
           System.out.println(e);
       }        
	}
 
	//QUE ES SAMEUSER
	static String sameUser="Ok";
	public static void create_user(String name) throws SQLException, ClassNotFoundException, JSONException, IOException {
		JSONObject ob = new JSONObject(name);
		Class.forName("com.mysql.cj.jdbc.Driver");
		sameUser="Ok";
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE username=\""+ ob.getString("userName")+"\"");
		while (rs.next()) {
			sameUser = "NoOk";
		}
		rs.close();
		stmt.close();
 
		//EXPLICAR ESTO Y CREO QUE EL ERROR ESTÁ EN EL .EQUALS
		if(sameUser.equals("Ok")) {
			if(ob.getString("image").equals("data:image/png;base64,") || ob.getString("image").equals("data:image/png;base64,undefined")) {
				PreparedStatement psInsertar = con.prepareStatement("INSERT INTO users (userName, password, email, image, location, typeRoute) VALUES (?, ?, ?, ?, ?, ?)");
				psInsertar.setString(1,ob.getString("userName"));
				psInsertar.setString(2,ob.getString("password"));
				psInsertar.setString(3,ob.getString("email"));
				psInsertar.setString(4,"http://85.56.203.68/images/user.png");
				psInsertar.setString(5,ob.getString("location"));
				psInsertar.setString(6,ob.getString("typeRoute"));
				int resultadoInsertar = psInsertar.executeUpdate();
			}else{
				PreparedStatement psInsertar = con.prepareStatement("INSERT INTO users (userName, password, email, image, location, typeRoute) VALUES (?, ?, ?, ?, ?, ?)");
				psInsertar.setString(1,ob.getString("userName"));
				psInsertar.setString(2,ob.getString("password"));
				psInsertar.setString(3,ob.getString("email"));
				format_image(ob.getString("image"));
				psInsertar.setString(4,image_path);
				psInsertar.setString(5,ob.getString("location"));
				psInsertar.setString(6,ob.getString("typeRoute"));
				int resultadoInsertar = psInsertar.executeUpdate();
			}
		}
		con.close();
	}
 
 
	public static String routes_location="";
	public static String home_location(String name) throws SQLException, ClassNotFoundException, JSONException, IOException {
		routes_location = "";
		JSONObject ob = new JSONObject(name);
		Integer userId = Integer.parseInt(ob.getString("id"));
		String location = "";
		Integer contador = 0;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT location FROM users WHERE id="+ userId);
			while (rs.next()) {
				location = rs.getString(1);
			}
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
 
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM route WHERE location=\""+ location+"\"");
			while (rs.next()) {
				if (contador == 0) {
					routes_location += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n}");
				}else {
					routes_location += (", \n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n} ");
				}
			contador ++;
			}
			routes_location+="]";
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
		return routes_location;
	}
 
	public static String routes_type="";
	public static String home_typeRoutes(String name) throws SQLException, ClassNotFoundException, JSONException, IOException {
		routes_type="";
		Integer id; 
		JSONObject ob = new JSONObject(name);
		Integer userId = Integer.parseInt(ob.getString("id"));
		String location = "";
		Integer contador = 0;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT typeRoute FROM users WHERE id="+ userId);
			while (rs.next()) {
				location = rs.getString(1);
			}
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
 
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM route WHERE type=\""+ location+"\"");
			while (rs.next()) {
				if (contador == 0) {
					routes_type += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n}");
				}else {
					routes_type += (", \n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n}");
				}
			contador ++;
			}
			routes_type+="]";
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
		return routes_type;
	}
 
 
	public static String route = "";
	public static void create_route(String name) throws SQLException, ClassNotFoundException, JSONException, IOException {
		route="";
		JSONObject ob = new JSONObject(name);
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		Statement stmt = con.createStatement();
		Integer id = 0;
			PreparedStatement psInsertar = con.prepareStatement("INSERT INTO route (name, location, type, perfectTo, map, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
			psInsertar.setString(1,ob.getString("name"));
			psInsertar.setString(2,ob.getString("location"));
			psInsertar.setString(3,ob.getString("type_route"));
			psInsertar.setString(4,ob.getString("perfectTo"));
			psInsertar.setString(5,ob.getString("map"));
			format_image(ob.getString("image"));
			psInsertar.setString(6,image_path);
			psInsertar.setString(7, ob.getString("description"));
			int resultadoInsertar = psInsertar.executeUpdate();  
 
		try {
			ResultSet rs1 = stmt.executeQuery("SELECT * FROM route WHERE name=\""+ ob.getString("name") + "\"");
			while (rs1.next()) {
				route += ("[{ \n \t\"id\": \"" + rs1.getInt(1) + "\", \n \t\"name\": \"" + rs1.getString(2) + "\", \n \t\"location\": \"" + rs1.getString(3) + "\", \n \t\"type\": \"" + rs1.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs1.getString(5) + "\", \n \t\"map\": \"" + rs1.getString(6) + "\", \n \t\"image\": \"\"" + rs1.getString(7) + "\", \n \t\"description\": \"\"" + rs1.getString(8) + "\" \n} ");
			}
		}catch (Exception e) {
			System.out.println(e);
		}
		try {
			ResultSet rs = stmt.executeQuery("SELECT id FROM route WHERE name=\""+ ob.getString("name")+"\"");
			while (rs.next()) {
				id = rs.getInt(1);
			}
			rs.close();
			stmt.close();
		}catch (Exception e) {
			System.out.println(e);
		}
 
		//Add to userroutes
		PreparedStatement psInsertar2 = con.prepareStatement("INSERT INTO userroutes (userRoute, userId) VALUES (?, ?)");
		psInsertar2.setInt(1,id);
		psInsertar2.setInt(2,ob.getInt("user_id"));
		int resultadoInsertar2 = psInsertar2.executeUpdate();
		con.close();
 
	}
 
	public static String find_route_name = "";
	public static String find_name(String name) throws SQLException, ClassNotFoundException, JSONException, IOException {
		find_route_name = "";
		JSONObject ob = new JSONObject(name);
		Integer contador = 1;
		Integer contador2 = 0;
		String route_name = ob.getString("name");
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM route WHERE name=\""+ route_name+"\"");
			while (rs.next()) {
				if (contador == 1) {
					find_route_name += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n} ");
				}else {
					find_route_name += (", \n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n }  ");
				}
			contador ++;
			contador2 ++;
			}
			if (contador2 != 0) {
				find_route_name+="]";
			}
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
		return find_route_name;
	}
 
	public static String find_route_location_type = "";
	public static String find_location_type(String name) throws SQLException, ClassNotFoundException, JSONException, IOException {
		JSONObject ob = new JSONObject(name);
		Integer contador = 1;
		Integer contador2 = 0;
		String route_type = ob.getString("routeType");
		String route_location = ob.getString("location");
		find_route_location_type="";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM route WHERE type=\""+ route_type+"\" AND location=\""+ route_location+"\"");
			while (rs.next()) {
				if (contador == 1) {
					find_route_location_type += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n}");
				}else {
					find_route_location_type += (",\n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n \t\"images\": \"" + rs.getString(7) + "\", \n \t\"description\": \"" + rs.getString(8) + "\" \n }  ");
				}
			contador ++;
			contador2 ++;
			}
			if (contador2 != 0) {
				find_route_location_type+="]";
			}
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
		return find_route_location_type;
	}
 
	public static String routes_of_a_user = "";
	public static String user_routes (String name) throws ClassNotFoundException, SQLException {
		routes_of_a_user = "";
		JSONObject ob = new JSONObject(name);
		String route_ids = "";
		Integer contador = 0;
		
		//WE PICK THE ID ROUTES BY USER ID
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT userRoute FROM userroutes WHERE userId="+ob.getInt("user_id"));
		ArrayList<Integer> ids = new ArrayList<Integer>();
	    while (rs.next()) {
			ids.add(rs.getInt(1));
		}
	    
	    //WE ADD TO THE STRING ALL THE ROUTES OF THE USER BY THE ID
	    if (contador == 0) {
		    routes_of_a_user += "[";
	    }
	    for (int i = 0; i < ids.size();i++) {
	    	ResultSet rs2 = stmt.executeQuery("SELECT * FROM route WHERE id="+ids.get(i)+ "");
	    	while (rs2.next()) {
				if (contador == 0) {
					routes_of_a_user += ("{ \n \t\"id\": " + rs2.getInt(1) + ", \n \t\"name\": \"" + rs2.getString(2) + "\", \n \t\"location\": \"" + rs2.getString(3) + "\", \n \t\"type\": \"" + rs2.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs2.getString(5) + "\", \n \t\"map\": \"" + rs2.getString(6) + "\", \n \t\"images\": \"" + rs2.getString(7) + "\", \n \t\"description\": \"" + rs2.getString(8) + "\" \n}");
				}else {
					routes_of_a_user += (", \n { \n \t\"id\": " + rs2.getInt(1) + ", \n \t\"name\": \"" + rs2.getString(2) + "\", \n \t\"location\": \"" + rs2.getString(3) + "\", \n \t\"type\": \"" + rs2.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs2.getString(5) + "\", \n \t\"map\": \"" + rs2.getString(6) + "\", \n \t\"images\": \"" + rs2.getString(7) + "\", \n \t\"description\": \"" + rs2.getString(8) + "\"\n}  ");
				}
			contador ++;
			
			}
	    }
	    if (contador > 0) {
		    routes_of_a_user += "]";
	    }
		rs.close();
		stmt.close();
		con.close();
		return routes_of_a_user;
	}
 
	

	public static String x = "";
	public static String prueba(String name) throws ClassNotFoundException, SQLException {
		x = "";
		JSONObject ob = new JSONObject(name);
		String route_ids = "";
		Integer contador = 0;
		
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT routeId FROM visitedsites WHERE userId=\""+ob.getInt("user_id") + "\"");
		ArrayList<Integer> ids = new ArrayList<Integer>();
	    while (rs.next()) {
			ids.add(rs.getInt(1));
		}
	    
	    if (contador == 0) {
		    x+="[";
	    }
	    for (int i = 0; i < ids.size(); i++) {
	    	ResultSet rs2 = stmt.executeQuery("SELECT * FROM route WHERE id=\""+ids.get(i) + "\"");
			while (rs2.next()) {
				if (contador == 0) {
					x += ("{ \n \t\"id\": " + rs2.getInt(1) + ", \n \t\"name\": \"" + rs2.getString(2) + "\", \n \t\"location\": \"" + rs2.getString(3) + "\", \n \t\"type\": \"" + rs2.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs2.getString(5) + "\", \n \t\"map\": \"" + rs2.getString(6) + "\", \n \t\"images\": \"" + rs2.getString(7) + "\", \n \t\"description\": \"" + rs2.getString(8) + "\" \n}");
				}else {
					x += (", \n { \n \t\"id\": " + rs2.getInt(1) + ", \n \t\"name\": \"" + rs2.getString(2) + "\", \n \t\"location\": \"" + rs2.getString(3) + "\", \n \t\"type\": \"" + rs2.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs2.getString(5) + "\", \n \t\"map\": \"" + rs2.getString(6) + "\", \n \t\"images\": \"" + rs2.getString(7) + "\", \n \t\"description\": \"" + rs2.getString(8) + "\" \n }  ");
				}
			contador ++;
			}
	    }
	    if (contador > 0) {
		    x+="]";
	    }
	    System.out.println(x);
		rs.close();
		stmt.close();
		con.close();
		return x;
	}
	
	public static String visited="";
	public static String visited_site_add(String name) {
		visited="";
		try {
		JSONObject ob = new JSONObject(name);
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		PreparedStatement psInsertar = con.prepareStatement("INSERT INTO visitedsites (userId, routeId) VALUES (?, ?)");
		psInsertar.setInt(1,ob.getInt("user_id"));
		psInsertar.setInt(2,ob.getInt("route_id"));
		int resultadoInsertar = psInsertar.executeUpdate();
		visited="OK";
		}catch (Exception e) {
			System.out.println(e);
			visited="NoOk";
		}
		return visited;
	}
	
	public static String email = "";
	public static String verificar_email(String name) throws SQLException, ClassNotFoundException {
		email = "";
		String valor = "";
		JSONObject ob = new JSONObject(name);
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT email FROM users");
		ArrayList<String> emails = new ArrayList<String>();
	    while (rs.next()) {
			emails.add(rs.getString(1));
		}
		String hostEmail = "smtp.gmail.com";
		String portEmail = "587";
		String strAsunto = "Recuperar Contraseña";
		String strMensaje = "HEMOS SUFRIDO UNA AVERIA!!!";
		String emailRemitente = "aev07add@gmail.com";
		String emailRemitentePass = "SMM_2002";
		String email = ob.getString("email");
	    for (int i = 0; i < emails.size(); i++) {
	    	if (emails.get(i) == email) {
	    		valor =  "true";
	    		try {
	    			envioMail(strMensaje, strAsunto, hostEmail, portEmail, email, emailRemitente, emailRemitentePass);
	    		}catch (UnsupportedEncodingException | MessagingException e) {
	    			e.printStackTrace();
	    		}
	    	}else {
	    		valor = "false";
	    	}
	    }
		return valor;
	}
	
	public static String isCompleted = "";
	public static String isCompleted_route(String name) {
		isCompleted = "";
		Integer counter = 0;
		JSONObject ob = new JSONObject(name);
		try {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
		Statement stmt = con.createStatement();
		System.out.println("SELECT * FROM visitedsites WHERE userId="+ob.getInt("user_id") + " AND routeId="+ob.getInt("route_id"));
		ResultSet rs = stmt.executeQuery("SELECT * FROM visitedsites WHERE userId="+ob.getInt("user_id") + " AND routeId="+ob.getInt("route_id")+";");
		
		while (rs.next()) {
			counter ++;
		}
		if (counter > 0) {
			isCompleted = "Ok";
		}else {
			isCompleted = "NoOk";
		}
		}catch (Exception e) {
			System.out.println(e);
		}
		return isCompleted;
	}
 
	public static String number = "";
	public static String visited_sites_counter (String name) {
		number = "";
		JSONObject ob = new JSONObject(name);
		Integer counter = 0;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT routeId FROM visitedsites WHERE userId=\""+ob.getInt("user_id") + "\"");
			while (rs.next()) {
				counter ++;
			}
			number = String.valueOf(counter);
			rs.close();
			stmt.close();
			con.close();
		}catch (Exception e) {
			System.out.println(e);
		}
		return number;
 
	}
 
	public static String profile_update = "";
	public static String update_profile(String name) {
		profile_update = "";
		JSONObject ob = new JSONObject(name);
			String image = ob.getString("image");
			if (image.length()<50) {
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
					PreparedStatement psActualizar = con.prepareStatement("UPDATE users SET userName= \"" + ob.getString("userName") + "\" ,password= \"" + ob.getString("password") + "\" ,email=\"" + ob.getString("email") + "\" ,image=\"" + ob.getString("image") + "\" ,location=\"" + ob.getString("location") + "\" ,typeRoute=\"" + ob.getString("type_route") + "\" WHERE id=" + ob.getInt("user_id") + "");
					int resultadoActualizar = psActualizar.executeUpdate();
					profile_update = "OK";
				}catch (Exception e) {
					System.out.println(e);
					profile_update = "NoOk";
				}
			}else {
				try {
					format_image(ob.getString("image"));
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
					PreparedStatement psActualizar = con.prepareStatement("UPDATE users SET userName= \"" + ob.getString("userName") + "\" ,password= \"" + ob.getString("password") + "\" ,email=\"" + ob.getString("email") + "\" ,image=\"" + image_path + "\" ,location=\"" + ob.getString("location") + "\" ,typeRoute=\"" + ob.getString("type_route") + "\" WHERE id=" + ob.getInt("user_id") + "");
					int resultadoActualizar = psActualizar.executeUpdate();
					profile_update = "OK";
				}catch (Exception e) {
					System.out.println(e);
					profile_update = "NoOk";
				}
			}
		return name;
	}
	
	public static String deleted_profile = "";
	public static String delete_profile(String name) throws ClassNotFoundException, SQLException {
		try {
			JSONObject ob = new JSONObject(name);
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			PreparedStatement psBorrar1 = con.prepareStatement("DELETE FROM visitedsites WHERE userId=\"" + ob.getInt("user_id") + "\"");
			PreparedStatement psBorrar2 = con.prepareStatement("DELETE FROM userroutes WHERE userId=\"" + ob.getInt("user_id") + "\"");
			PreparedStatement psBorrar3 = con.prepareStatement("DELETE FROM users WHERE id=\"" + ob.getInt("user_id") + "\"");
			int resultadoBorrar1 = psBorrar1.executeUpdate();
			int resultadoBorrar2 = psBorrar2.executeUpdate();			
			int resultadoBorrar3 = psBorrar3.executeUpdate();
			deleted_profile="OK";
		}catch (Exception e) {
			System.out.println(e);
			deleted_profile = "NoOk";
		}
		return deleted_profile;
	}
	
	public static String user="";
	public static String user_by_id(String name) {
		user="";
		JSONObject ob = new JSONObject(name);
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal","54487969SMM_2002");
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id=" + ob.getInt("user_id") + "");
			while (rs.next()) {
					user += ("{\"id\": " + rs.getInt(1) + ", \n \t\"userName\": \"" + rs.getString(2) + "\", \n \t\"password\": \"" + rs.getString(3) + "\", \n \t\"email\": \"" + rs.getString(4) + "\", \n \t\"image\": \""+ rs.getString(5) + "\", \n \t\"location\": \"" + rs.getString(6) + "\", \n \t\"typeRoute\": \"" + rs.getString(7) + "\" \n} ");
			}
			rs.close();
			stmt.close();
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return user;
	}
 
	public static String get(String name) {
		// TODO Auto-generated method stub
		String x = "";
		Integer contador = 1;
		switch (name) {
		case "users":
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal",
						"54487969SMM_2002");
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM users");
				while (rs.next()) {
					if (contador == 1) {
						x += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"userName\": \"" + rs.getString(2) + "\", \n \t\"password\": \"" + rs.getString(3) + "\", \n \t\"email\": \"" + rs.getString(4) + "\", \n \t\"image\": \""+ rs.getString(5) + "\", \n \t\"location\": \"" + rs.getString(6) + "\", \n \t\"typeRoute\": \"" + rs.getString(7) + "\" \n} ");
					}else {
						x += (", \n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"userName\": \"" + rs.getString(2) + "\", \n \t\"password\": \"" + rs.getString(3) + "\", \n \t\"email\": \"" + rs.getString(4) + "\", \n \t\"image\": \""+ rs.getString(5) + "\", \n \t\"location\": \"" + rs.getString(6) + "\", \n \t\"typeRoute\": \"" + rs.getString(7) + "\" \n} ");
					}
				contador ++;
				}
				x+="]";
				rs.close();
				stmt.close();
				con.close();
			} catch (Exception e) {
				System.out.println(e);
			}
			break;
		case "route":
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal",
						"54487969SMM_2002");
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM route");
				while (rs.next()) {
					if (contador == 1) {
						x += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n} ");
					}else {
						x += (", \n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"location\": \"" + rs.getString(3) + "\", \n \t\"type\": \"" + rs.getString(4) + "\", \n \t\"perfectoTo\": \""+ rs.getString(5) + "\", \n \t\"map\": \"" + rs.getString(6) + "\", \n} ");
					}
				contador ++;
				}
				x+="]";
				rs.close();
				stmt.close();
				con.close();
			} catch (Exception e) {
				System.out.println(e);
			}
			break;
		case "restsites":
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal",
						"54487969SMM_2002");
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM restsites");
				while (rs.next()) {
					if (contador == 1) {
						x += ("[{ \n \t\"id\": " + rs.getInt(1) + ", \n \t\"name\": \"" + rs.getString(2) + "\", \n \t\"route\": " + rs.getInt(3) + ", \n} ");
					}else {
						x += (", \n { \n \t\"id\": " + rs.getInt(1) + ", \n \t\"userName\": \"" + rs.getString(2) + "\", \n \t\"password\": " + rs.getInt(3) + ", \n} ");
					}
				contador ++;
				}
				x+="]";
				rs.close();
				stmt.close();
				con.close();
			} catch (Exception e) {
				System.out.println(e);
			}
			break;
		case "userroutes":
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal",
						"54487969SMM_2002");
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM userroutes");
				while (rs.next()) {
					if (contador == 1) {
						x += ("[{ \n \t\"userId\": " + rs.getInt(1) + ", \n \t\"userRoute\": \"" + rs.getInt(2) + "\", \n} ");
					}else {
						x += (", \n { \n \t\"userId\": " + rs.getInt(1) + ", \n \t\"userRoute\": \"" + rs.getInt(2) + "\", \n} ");
					}
				contador ++;
				}
				x+="]";
				rs.close();
				stmt.close();
				con.close();
			} catch (Exception e) {
				System.out.println(e);
			}
			break;
		case "visitedsites":
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection con = DriverManager.getConnection("jdbc:mysql://85.56.203.68:3306/wayx", "smariscal",
						"54487969SMM_2002");
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM visitedsites");
				while (rs.next()) {
					if (contador == 1) {
						x += ("[{ \n \t\"userId\": " + rs.getInt(1) + ", \n \t\"routeId\": \"" + rs.getInt(2) + "\", \n} ");
					}else {
						x += (", \n { \n \t\"userId\": " + rs.getInt(1) + ", \n \t\"routeId\": \"" + rs.getInt(2) + "\", \n} ");
					}
				contador ++;
				}
				x+="]";
				rs.close();
				stmt.close();
				con.close();
			} catch (Exception e) {
				System.out.println(e);
			}
			break;
		}
		return x;
 
	}
	// FIN BLOQUE RESPONSE
	public static void envioMail (String mensaje, String asunto, String hostEmail, String portEmail, String email, String email_remitente, String email_remitente_pass) throws UnsupportedEncodingException, MessagingException{	
		Properties props = System.getProperties();
		props.put("mail.smtp.host", hostEmail);
		props.put("mail.smtp.user", email_remitente);
		props.put("mail.smtp.clave", email_remitente_pass);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", portEmail);
		Session session = Session.getDefaultInstance(props);
		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress(email_remitente));
		message.addRecipients(Message.RecipientType.TO, email);
		message.setSubject(asunto);
		BodyPart messageBodyPart1 = new MimeBodyPart();
		messageBodyPart1.setText(mensaje);
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart1);
		message.setContent(multipart);
		Transport transport = session.getTransport("smtp");
		transport.connect(hostEmail, email_remitente, email_remitente_pass);
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}
}
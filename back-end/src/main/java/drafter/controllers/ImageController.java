package drafter.controllers;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import drafter.services.ImageService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/image")
public class ImageController extends AbstractController {

	@Autowired
	private ImageService imageService;
	
	
	@PostMapping("/save")
	public String save(@RequestParam("file") MultipartFile file) throws IOException {
		imageService.save(process(file.getBytes()));
		return "";
	}
	
	@GetMapping(value = "/{img}", produces = "image/gif")
	public byte[] get(@PathVariable int img) {
		return imageService.find(img).getData();
	}
	
	private byte[] process(byte[] data) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		BufferedImage img = ImageIO.read(new ByteArrayInputStream(data));
		
		if(img.getWidth() > img.getHeight())
			img = img.getSubimage(img.getWidth()/2-img.getHeight()/2, 0, img.getHeight(), img.getHeight());
		else
			img = img.getSubimage(0, img.getHeight()/2-img.getWidth()/2, img.getWidth(), img.getWidth());
		
		img = resize(img, 128, 128);
		ImageIO.write(img, "gif", out);
		
		return out.toByteArray();
	}
	
	private BufferedImage resize(BufferedImage img, int w, int h) {
		java.awt.Image tmp = img.getScaledInstance(w, h, java.awt.Image.SCALE_SMOOTH);
		BufferedImage dimg = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

		Graphics2D g2d = dimg.createGraphics();
		g2d.drawImage(tmp, 0, 0, null);
		g2d.dispose();

		return dimg;
	}
	
}

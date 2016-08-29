package com.hzpz.pzlibrary.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import android.support.v4.util.ArrayMap;
import android.util.Log;

/**
 * xml 工具类 
 * @author sunyl
 *
 */
public class XmlUtil {

	/**
	 * 判断sdcard是否存在
	 * 
	 * @return
	 */
	public static boolean sdcardIsExist() {
		String sdcardPath = BitmapUtil.getSDCardPath();
		if (StringUtil.isBlank(sdcardPath)) {
			return false;
		}
		return true;
	}
	
	/**
	 * 判断文件是否是否存在
	 * @param file  文件路径
	 * @return
	 */
	public static boolean fileIsExist(String file) {
		File f = new File(file);
		if (!f.exists())
			return false;
		return true;
	}

	/**
	 * 创建文件
	 * @param  file      文件路径
	 * @param  fileName  文件名
	 * @return
	 */
	public static boolean createFile(String file,String fileName) {
		try {
			if(!sdcardIsExist())    //如果检测到手机没有sd卡就不创建xml文件
				return false;
			String path  = BitmapUtil.getSDCardPath() + file;
			File f = null;
			if (!fileIsExist(path)) {
				f = new File(path);
				f.mkdir();
			}
			path  = BitmapUtil.getSDCardPath() + file + fileName;
			if(fileIsExist(path))
				return false;
			f = new File(path);
			f.createNewFile();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * 删除文件
	 * @param  file      文件路径
	 * @param  fileName  文件名
	 */
	public static void deleteFile(String file,String fileName){
		String path = BitmapUtil.getSDCardPath() + file + fileName;
		if (fileIsExist(path)){
			File f = new File(path);
			f.delete();
		}
	}
	
	/**
	 * 创建xml文件
	 * @param file        文件存放路径
	 * @param fileName    文件名
	 * @param values      xml键值对
	 */
	public static void createXML(String file,String fileName,Map<String,String> values) {
		if(StringUtil.isBlank(file) || StringUtil.isBlank(fileName) || values == null || values.size() <= 0)
			return;
		try {
			//创建xml文件
			if(!createFile(file,fileName)) return;   
			FileOutputStream out = new FileOutputStream(new File(BitmapUtil.getSDCardPath() + file, fileName));
			DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = builderFactory.newDocumentBuilder();

			Document document = builder.newDocument();
			// 建立根节点 person
			Element root = document.createElement("root");
			Set<String> keys = values.keySet();
			for (String key : keys) {
				root.setAttribute(key, values.get(key)); 
			}
			// 添加到document
			document.appendChild(root);

			// 设置输出结果
			DOMSource domSource = new DOMSource(document);
			PrintWriter writer = new PrintWriter(out);
			StreamResult result = new StreamResult(writer);
			TransformerFactory factory = TransformerFactory.newInstance();
			Transformer transformer = factory.newTransformer();
			// 开始把Document映射到result
			transformer.transform(domSource, result);

		} catch (Exception e) {
			Log.e("createXML", "create user xml error:"+e.getMessage());
		}

	}

	/**
	 * 读取xml文件
	 * @param file			文件存放路径
	 * @param fileName		文件名
	 * @param keys          xml键
	 */
	public static Map<String,String> readXML(String file,String fileName,String[] keys) {
		if(StringUtil.isBlank(file) || StringUtil.isBlank(fileName) || keys == null || keys.length <= 0)
			return null;
		if(!fileIsExist(BitmapUtil.getSDCardPath() + file + fileName))
			return null;
		Map<String,String> values = new ArrayMap<String, String>();
		try {
			FileInputStream is = new FileInputStream(BitmapUtil.getSDCardPath() + file + fileName);
			// 得到DocumentBuilderFactory对象 由该对象可以得到 DocumentBuilder 对象
			DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
			// 得到DocumentBuilder对象
			DocumentBuilder builder = builderFactory.newDocumentBuilder();
			// 得到代表整个xml的Document对象
			Document document = builder.parse(is);
			// 得到根节点
			Element element = document.getDocumentElement();
			for (String key : keys) {
				values.put(key, element.getAttribute(key));
			}
		} catch (Exception e) {
			Log.e("readXML", "read user xml error:"+e.getMessage());
		}
		return values;
	}
}

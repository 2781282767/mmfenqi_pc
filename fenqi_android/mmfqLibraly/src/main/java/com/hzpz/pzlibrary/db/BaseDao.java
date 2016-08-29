package com.hzpz.pzlibrary.db;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class BaseDao extends SQLiteOpenHelper {
	private  static String DATABASENAME = "database.db";
    public static void initDataBase(String DBName){
    	DATABASENAME = DBName ;
    }
	private final static int DATABASEVERSION = 1;

	public SQLiteDatabase db = null;

	public BaseDao(Context context) {
		this(context, DATABASENAME, null, DATABASEVERSION);
	}

	public BaseDao(Context context, String name, CursorFactory factory, int version) {
		super(context, name, factory, version);
		db = getWritableDatabase();// 以读写方式打开数据库
	}

	public void onCreate(SQLiteDatabase db) {
		System.out.println("<<<建立数据库>>>");
		createTable(db);
	}

	/**
	 * 数据库升级
	 */
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		Log.e("DAI", "数据库需要升级：" + oldVersion + "-->" + newVersion);
	}
	
	/**
	 * 数据库降级
	 */
	@Override
	public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		
	}
	
	/**
	 * 修改表结构
	 */
	private void updateTable(SQLiteDatabase db){
		
	}
	
	private boolean checkColumnExist(SQLiteDatabase db, String tableName
	        , String columnName) {
	    boolean result = false ;
	    Cursor cursor = null ;
	    try{
	        //查询一行
	        cursor = db.rawQuery( "SELECT * FROM " + tableName + " LIMIT 1"
	            , null );
	        result = cursor != null && cursor.getColumnIndex(columnName) != -1 ;
	    }catch (Exception e){
	    }finally{
	        if(null != cursor && !cursor.isClosed()){
	            cursor.close() ;
	        }
	    }

	    return result ;
	}

	private void createTable(SQLiteDatabase db) {
		db.execSQL(TableHelper.Version.CREATE_VERSION_TABLE);
	}
	
}

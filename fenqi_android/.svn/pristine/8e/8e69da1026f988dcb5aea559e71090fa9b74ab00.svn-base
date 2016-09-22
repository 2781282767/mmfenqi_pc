package com.hzpz.pzlibrary.utils;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by hp on 2016/3/2.
 */
public class PreferenceUtil {
    public static final String KEY_FIRST_ENTER = "key_first_enter" ;
    public static final String SYSTEM_SETTING_NAME = "system_setting_name" ;


    /**
     * 取配置参数的值
     *
     * @param ctx
     * @param key
     * @return
     */
    public static String getString(Context ctx, String key) {
        return getSharedPreferences(ctx).getString(key, "");
    }

    public static String getString(Context ctx, String key, String defaultValue) {
        return getSharedPreferences(ctx).getString(key, defaultValue);
    }

    /**
     * 设置配置参数的值
     *
     * @param ctx
     * @param key
     * @param value
     */
    public static void putString(Context ctx, String key, String value) {
        getSharedPreferences(ctx).edit().putString(key, value).commit();
    }

    public static boolean getBoolean(Context ctx, String key) {
        return getSharedPreferences(ctx).getBoolean(key, false);
    }

    public static boolean getBoolean(Context ctx, String key, boolean defValue) {
        return getSharedPreferences(ctx).getBoolean(key, defValue);
    }

    public static void putBoolean(Context ctx, String key, boolean value) {
        getSharedPreferences(ctx).edit().putBoolean(key, value).commit();
    }

    public static SharedPreferences getSharedPreferences(Context ctx) {
        return ctx.getSharedPreferences(SYSTEM_SETTING_NAME, Context.MODE_PRIVATE);
    }

    public static SharedPreferences getSharedPreferences(Context ctx, String filename) {
        return ctx.getSharedPreferences(filename, Context.MODE_PRIVATE);
    }

    /********************************** add by wen.yugang ******************************************/

    public static float getFloat(Context ctx, String key, float defValue) {
        return getSharedPreferences(ctx).getFloat(key, defValue);
    }

    public static void putFloat(Context ctx, String key, float value) {
        getSharedPreferences(ctx).edit().putFloat(key, value).commit();
    }

    public static long getLong(Context ctx, String key, long defValue) {
        return getSharedPreferences(ctx).getLong(key, defValue);
    }

    public static void putLong(Context ctx, String key, long value) {
        getSharedPreferences(ctx).edit().putLong(key, value).commit();
    }

    public static int getInteger(Context ctx, String key, int defValue) {
        return getSharedPreferences(ctx).getInt(key, defValue);
    }

    public static void putInteger(Context ctx, String key, int value) {
        getSharedPreferences(ctx).edit().putInt(key, value).commit();
    }
}

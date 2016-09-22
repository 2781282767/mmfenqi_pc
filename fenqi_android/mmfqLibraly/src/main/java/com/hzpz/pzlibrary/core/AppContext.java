package com.hzpz.pzlibrary.core;

import com.hzpz.pzlibrary.App;

public class AppContext {
	private App app;

	private static AppContext instance;

	private AppContext() {
	}

	public static AppContext getInstance() {
		if (instance == null) {
			instance = new AppContext();
		}
		return instance;
	}

	public void setApp(App app) {
		this.app = app;
	}

	public App getAppContext() {
		return app;
	}
}

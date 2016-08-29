package com.mmfenqi.Bean;

/**
 * Created by hp on 2016/3/3.
 */
public class CityInfos {
    private String showCityName="";
    private Object citys;//城市详细信息

    public String getShowCityName() {
        return showCityName;
    }

    public void setShowCityName(String showCityName) {
        this.showCityName = showCityName;
    }

    public Object getCitys() {
        return citys;
    }

    public void setCitys(City citys) {
        this.citys = citys;
    }
}

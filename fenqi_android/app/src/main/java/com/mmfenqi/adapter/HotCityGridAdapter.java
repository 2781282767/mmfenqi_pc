package com.mmfenqi.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.mmfenqi.Bean.CityInfos;
import com.mmfenqi.mmfq.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hp on 2016/3/3.
 */
public class HotCityGridAdapter extends BaseAdapter {
    private Context context;
    private LayoutInflater inflater;
    private List<CityInfos> cityInfos = new ArrayList<CityInfos>();
    public HotCityGridAdapter(Context context) {
        this.context=context;
        inflater = LayoutInflater.from(context);
    }

    /**
     * 获取集合数据
     * @return
     */
    public List<CityInfos> getData(){
        return cityInfos;
    }

    /**
     * 设置数据到适配器
     * @return
     */
    public void setData(List<CityInfos> cityInfos){
        if (cityInfos!=null){
            this.cityInfos=cityInfos;
        }
        notifyDataSetChanged();
    }
    @Override
    public int getCount() {
        return cityInfos.size();
    }

    @Override
    public Object getItem(int position) {
        return cityInfos.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final ViewHolder holder;
        final CityInfos item = (CityInfos) getItem(position);
        if (convertView == null) {
            holder = new ViewHolder();
            convertView = inflater.inflate(R.layout.citys_item_layout, null);
            holder.tv_city = (TextView) convertView.findViewById(R.id.tv_city);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        if (item!=null){
            holder.tv_city.setText(item.getShowCityName());
        }
        return convertView;
    }
    class ViewHolder{
        TextView tv_city;
    }
}

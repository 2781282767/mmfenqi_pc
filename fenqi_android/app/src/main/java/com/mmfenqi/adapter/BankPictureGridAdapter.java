package com.mmfenqi.adapter;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

import com.mmfenqi.mmfq.R;

import java.util.ArrayList;
import java.util.List;

/**
 * 图片显示适配器
 */
public class BankPictureGridAdapter extends BaseAdapter{
    private Context context;
    private LayoutInflater inflater;
    private List<Bitmap> bitmaps = new ArrayList<>();

    public BankPictureGridAdapter(Context context){
        this.context=context;
        inflater=LayoutInflater.from(context);
    }

    /**
     * 添加单个bitmap对象
     * @param bitmap
     */
    public void addBitmap(Bitmap bitmap){
        if (bitmap!=null){
            bitmaps.add(bitmap);
        }
    }
    /**
     * 添加bitmap集合
     * @param bitmaps
     */
    public void addData(List<Bitmap> bitmaps){
        if(bitmaps == null){
            bitmaps = new ArrayList<Bitmap>();
        }
        bitmaps.addAll(bitmaps);
        notifyDataSetChanged();
    }
    /**
     * 替换bitmap集合
     * @param bitmaps
     */
    public  void update(List<Bitmap> bitmaps) {
        if (bitmaps != null) {
            this.bitmaps = bitmaps;
            notifyDataSetChanged();
        }
    }

    @Override
    public int getCount() {
        return 4;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder = null;
        if (convertView == null) {
            convertView = inflater.inflate(R.layout.item_published_grida,
                    parent, false);
            holder = new ViewHolder();
            holder.image = (ImageView) convertView
                    .findViewById(R.id.item_grida_image);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        return convertView;
    }

    public class ViewHolder {
        public ImageView image;
    }
}

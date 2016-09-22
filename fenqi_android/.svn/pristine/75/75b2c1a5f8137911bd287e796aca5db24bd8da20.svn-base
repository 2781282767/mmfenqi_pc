package com.mmfenqi.mmfq;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.mmfenqi.Bean.CropperImage;
import com.mmfenqi.utils.Utils;

/**
 * @Class: ShowCropperedActivity
 * @Description: 显示截图结果界面
 * @author: lling(www.cnblogs.com/liuling)
 * @Date: 2015/10/25
 */
public class ShowCropperedActivity extends Activity {
    private static final String TAG = "ShowCropperedActivity";
    ImageView imageView;
    int beginHeight, endHeight, beginWidht, endWidth;
    CropperImage cropperImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_croppered);
        imageView = (ImageView) findViewById(R.id.image);
        String path = getIntent().getStringExtra("path");
        cropperImage = (CropperImage) getIntent().getSerializableExtra("cropperImage");
        int width = getIntent().getIntExtra("width", 0);
        int height = getIntent().getIntExtra("height", 0);
        beginWidht = (int)cropperImage.getHeight();
        beginHeight = (int)cropperImage.getWidth();
        if(width != 0 && height != 0) {
            int screenWidth = Utils.getWidthInPx(this);
            float scale = (float)screenWidth/(float)width;
            final ViewGroup.LayoutParams lp = imageView.getLayoutParams();
            int imgHeight = (int)(scale * height);
            endWidth = screenWidth;
            endHeight = imgHeight;
            lp.height = imgHeight;
            imageView.setLayoutParams(lp);
            Log.e(TAG, "imageView.getLayoutParams().width:" + imageView.getLayoutParams().width);
        }
        imageView.setImageURI(getIntent().getData());
    }
}

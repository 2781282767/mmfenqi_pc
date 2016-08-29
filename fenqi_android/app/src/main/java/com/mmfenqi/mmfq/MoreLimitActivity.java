package com.mmfenqi.mmfq;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.View;
import android.widget.AdapterView;

import com.hzpz.pzlibrary.utils.Base64;
import com.mmfenqi.adapter.BankPictureGridAdapter;
import com.mmfenqi.adapter.ZFBPictureGridAdapter;
import com.mmfenqi.dialog.ChoosePicTypeDialog;
import com.mmfenqi.widget.MyGridview;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class MoreLimitActivity extends BaseActivity implements AdapterView.OnItemClickListener{
    private MyGridview zfbGrid;
    private MyGridview bankGrid;
    private List<Bitmap> zfbBitmaps = new ArrayList<>();
    private List<Bitmap> bankBitmaps = new ArrayList<>();
    private ZFBPictureGridAdapter mZfbAdapter;
    private BankPictureGridAdapter mBankAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_more_limit, true);
        initView();
        initData();
    }

    /**
     * 初始化布局
     */
    private void initView() {
        setTitle("更高额度认证");
        zfbGrid= (MyGridview) findViewById(R.id.zfbGrid);
        bankGrid= (MyGridview) findViewById(R.id.bankGrid);
        mZfbAdapter=new ZFBPictureGridAdapter(this);
        zfbGrid.setAdapter(mZfbAdapter);
//        mBankAdapter=new BankPictureGridAdapter(this);
//        bankGrid.setAdapter(mBankAdapter);
        zfbGrid.setOnItemClickListener(this);
//        bankGrid.setOnItemClickListener(this);
    }
    /**
     * 加载数据
     */
    private void initData() {




    }

    public static final int REQUEST_CODE_CAMERA = 101;    //调用摄像头参数
    public static final int REQUEST_CODE_GALLERY = 100;   //从本地相册取照片参数

    private ChoosePicTypeDialog uploadAvatarDialog;  //设置头像dialog

    /**
     * 上传头像
     */
    private void updateHead() {
        if (uploadAvatarDialog == null) {
            uploadAvatarDialog = new ChoosePicTypeDialog(this, this);
        }
        uploadAvatarDialog.setListener(new MoreLimitActivity.UploadListener());
        uploadAvatarDialog.show();
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        if (view==zfbGrid){

        }else{

        }
        updateHead();
    }

    /**
     * 上传头像回调函数
     * @author sunyl
     *
     */
    public  class UploadListener implements ChoosePicTypeDialog.UploadPicListener {

        @Override
        public void camera() {
            Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(new File(Environment.getExternalStorageDirectory(), "bankzfbpic.jpg")));// 指定调用相机拍照后的照片存储的路径
            startActivityForResult(intent, REQUEST_CODE_CAMERA);
        }

        @Override
        public void choose() {
            Intent intent = new Intent(Intent.ACTION_PICK, null);
            intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
            startActivityForResult(intent, REQUEST_CODE_GALLERY);
        }


    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK) {
            switch (requestCode) {
                // 直接从相册获取
                case REQUEST_CODE_GALLERY:
                    startPhotoZoom(data.getData());
                    break;
                // 调用相机拍照时
                case REQUEST_CODE_CAMERA:
                    File temp = new File(Environment.getExternalStorageDirectory() + "/bankzfbpic.jpg");
                    startPhotoZoom(Uri.fromFile(temp));
                    break;
                // 取得裁剪后的图片
                case 3:
                    if (data != null) {
                        setPicToView(data);
                    }
                    break;
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
    }


    /**
     * 裁剪图片方法实现
     *
     * @param uri
     */
    public void startPhotoZoom(Uri uri) {
        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(uri, "image/*");
        intent.putExtra("crop", "true");
        // aspectX aspectY 是宽高的比例
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 1);
        // outputX outputY 是裁剪图片宽高
        intent.putExtra("outputX", 80);
        intent.putExtra("outputY", 80);
        intent.putExtra("return-data", true);
        startActivityForResult(intent, 3);
    }

    /**
     * 保存裁剪之后的图片数据
     *
     * @param picdata
     */
    private String mEncoderBase64;
    /** 处理过后的头像bitmap */
    private Bitmap photo;
    @SuppressLint("NewApi")
    private void setPicToView(Intent picdata) {
        Bundle extras = picdata.getExtras();
        if (extras != null) {
            photo = extras.getParcelable("data");
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            photo.compress(Bitmap.CompressFormat.JPEG, 60, stream);
            byte[] b = stream.toByteArray(); // 将图片流以字符串形式存储下来
//            ivHead.setImageBitmap(ToolUtil.getRoundedCornerBitmap(photo, 2));
            mEncoderBase64 = Base64.encode(b);// 返回Base64编码过的字节数组字符串
        }
        mZfbAdapter.addBitmap(photo);
    }
    public static void launchActivity(Activity act) {
        Intent intent = new Intent(act, MoreLimitActivity.class);
        act.startActivity(intent);
    }
}

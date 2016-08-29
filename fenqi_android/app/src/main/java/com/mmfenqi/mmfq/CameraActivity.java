package com.mmfenqi.mmfq;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.hardware.Camera;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.Display;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

public class CameraActivity extends BaseActivity implements View.OnClickListener{
    private Button bt_takephoto;//照相按钮
    //相机surfaceview
    private SurfaceView surfaceView;
    private Camera camera;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initCameraConfig();
        setContentView(R.layout.activity_camera, false);
        initView();
        initListener();
        initCamera();
    }
    /**
     * 初始化view
     */
    private void initView() {
//        bt_takephoto= (Button) findViewById(R.id.bt_takephoto);
    }

    /**
     * 设置监听
     */
    private void initListener() {
//        bt_takephoto.setOnClickListener(this);

    }
    /**
     * 初始化相册所需的参数
     */
    private void initCameraConfig(){
        Window window = getWindow();
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
    /**
     * 初始化相机信息
     */
    private void initCamera() {
        surfaceView = (SurfaceView) findViewById(R.id.surfaceView);
        surfaceView.getHolder().setFixedSize(176, 144);
        // 设置SurfaceHolder对象的类型
        surfaceView.getHolder()
                .setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
        // 指定用于捕捉拍照事件的SurfaceHolder.Callback对象
        surfaceView.getHolder().addCallback(new SurfaceCallback());
    }
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            //照相
//            case R.id.bt_takephoto:
//                camera.autoFocus(new Camera.AutoFocusCallback() {
//                    @Override
//                    public void onAutoFocus(boolean success, Camera camera) {
//                        // TODO Auto-generated method stub
//                        // success为true表示对焦成功
//                        if (success) {
//                            camera.takePicture(sc, null, new TakePictureCallback());
//                        }
//                    }
//                });
//                break;
        }
    }

    Camera.ShutterCallback sc = new Camera.ShutterCallback() {

        @Override
        public void onShutter() {
            // TODO Auto-generated method stub
            Toast.makeText(CameraActivity.this, "capture成功！", Toast.LENGTH_SHORT)
                    .show();
        }
    };
    private final class TakePictureCallback implements Camera.PictureCallback {
        // 该方法用于处理拍摄后的照片数据
        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            // data参数值就是照片数据，将这些数据以key-value形式保存，以便其他调用该Activity的程序可
            // 以获得照片数据
            try {
                Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0,
                        data.length);
                File file = new File(Environment.getExternalStorageDirectory()
                        + "/ms/prj", System.currentTimeMillis() + ".png");
                // 用流的方式保存图片
                FileOutputStream outStream = new FileOutputStream(file);
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, outStream);
                outStream.close();
                // 停止照片拍摄
                camera.stopPreview();
                camera.release();
                // 并重新启动预拍
                camera.startPreview();
            } catch (Exception e) {
                Log.e("IdentityActivity", e.toString());
            }
        }
    }
    private final class SurfaceCallback implements SurfaceHolder.Callback {
        private boolean preview;

        @Override
        public void surfaceChanged(SurfaceHolder holder, int format, int width,
                                   int height) {
            setCameraDisplayOrientation(CameraActivity.this,0,camera);
        }

        @Override
        public void surfaceCreated(SurfaceHolder holder) {
            // 获得Camera对象
            camera = Camera.open();
            int PreviewWidth = 0;
            int PreviewHeight = 0;
            WindowManager wm = (WindowManager) getSystemService(Context.WINDOW_SERVICE);//获取窗口的管理器
            Display display = wm.getDefaultDisplay();//获得窗口里面的屏幕
            Camera.Parameters parameters  = camera.getParameters();
            if (CameraActivity.this.getResources().getConfiguration().orientation != Configuration.ORIENTATION_LANDSCAPE) {
                // 如果是竖屏
                parameters.set("orientation", "portrait");
                // 在2.2以上可以使用
                // camera.setDisplayOrientation(90);
            } else {
                parameters.set("orientation", "landscape");
                // 在2.2以上可以使用
                // camera.setDisplayOrientation(0);
            }
            // 选择合适的预览尺寸
            List<Camera.Size> sizeList = parameters.getSupportedPreviewSizes();

            // 如果sizeList只有一个我们也没有必要做什么了，因为就他一个别无选择
            if (sizeList.size() > 1) {
                Iterator<Camera.Size> itor = sizeList.iterator();
                while (itor.hasNext()) {
                    Camera.Size cur = itor.next();
                    if (cur.width >= PreviewWidth
                            && cur.height >= PreviewHeight) {
                        PreviewWidth = cur.width;
                        PreviewHeight = cur.height;
                        break;
                    }
                }
            }
            parameters.setPreviewSize(PreviewWidth, PreviewHeight); //获得摄像区域的大小
            parameters.setPreviewFrameRate(3);//每秒3帧  每秒从摄像头里面获得3个画面
            parameters.setPictureFormat(PixelFormat.JPEG);//设置照片输出的格式
            parameters.set("jpeg-quality", 85);//设置照片质量
            parameters.setPictureSize(PreviewWidth, PreviewHeight);//设置拍出来的屏幕大小
            // 设置保存的图像大小
//			camera.setParameters(parameters);
            try {
                // 设置用于显示拍照影像的SurfaceHolder对象
                camera.setPreviewDisplay(surfaceView.getHolder());
                camera.startPreview();
                preview = true;
            } catch (IOException e) {
                Log.e("IdentityActivity", e.toString());
            }
        }

        @Override
        public void surfaceDestroyed(SurfaceHolder holder) {
            if (camera != null) {
                if (preview) {
                    camera.stopPreview();
                }
                // 释放手机摄像头
                camera.release();
            }
        }

    }
    public static void setCameraDisplayOrientation(Activity activity,
                                                   int cameraId, Camera camera) {
        Camera.CameraInfo info =
                new Camera.CameraInfo();
        Camera.getCameraInfo(cameraId, info);
        int rotation = activity.getWindowManager().getDefaultDisplay()
                .getRotation();
        int degrees = 0;
        switch (rotation) {
            case Surface.ROTATION_0: degrees = 0; break;
            case Surface.ROTATION_90: degrees = 90; break;
            case Surface.ROTATION_180: degrees = 180; break;
            case Surface.ROTATION_270: degrees = 270; break;
        }

        int result;
        if (info.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
            result = (info.orientation + degrees) % 360;
            result = (360 - result) % 360;  // compensate the mirror
        } else {  // back-facing
            result = (info.orientation - degrees + 360) % 360;
        }
        camera.setDisplayOrientation(result);
    }

    public static void launchActivity(Activity act) {
        Intent intent = new Intent(act, CameraActivity.class);
        act.startActivity(intent);
    }
}

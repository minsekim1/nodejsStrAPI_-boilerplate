package kr.co.react.boilerplate;

import android.content.Context;
import android.hardware.SensorManager;
import android.view.OrientationEventListener;
import android.view.WindowManager;

/**
 * 화면 회전 관련 리스너 클래스
 */
class RotationListener {
    private OrientationEventListener mOrientationEventListener ;
    private RotationCallBackListener mRotationCallBackListener;
    private int mLastRotation = 0;

    RotationListener(RotationCallBackListener rotationCallBackListener) {
        this.mRotationCallBackListener = rotationCallBackListener;
    }

    //리스너 enable
    void listen(final Context context) {
        mOrientationEventListener = new OrientationEventListener(context, SensorManager.SENSOR_DELAY_NORMAL) {
            @Override
            public void onOrientationChanged(int i) {
                WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
                if (windowManager != null && mRotationCallBackListener != null) {
                    int newRotation = windowManager.getDefaultDisplay().getRotation();
                    if (newRotation != mLastRotation) {
                        mRotationCallBackListener.onRotationChanged(mLastRotation, newRotation);
                        mLastRotation = newRotation;
                    }
                }
            }
        };

        mOrientationEventListener.enable();
        mLastRotation = ((WindowManager)(context.getSystemService(Context.WINDOW_SERVICE))).getDefaultDisplay().getRotation();
    }

    //리스너 disable
    void stop(){
        if (mOrientationEventListener != null) {
            mOrientationEventListener.disable();
        }
        mOrientationEventListener = null;
        mRotationCallBackListener = null;
    }

    public interface RotationCallBackListener{
        void onRotationChanged(int lastRotation, int newRotation);
    }
}


package kr.co.circlinplus;

import static kr.co.circlinplus.MainActivity.postToReact;

import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class NetworkStatusService extends BroadcastReceiver {
    public static String networkStatus = "null";
    static boolean isNetworkInit = true;
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        // 네트워크 상태가 변경되었을때 호출되는 메소드.
        if (action.equals(ConnectivityManager.CONNECTIVITY_ACTION)) {
            ConnectivityManager connectivityManager =
                    (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetInfo = connectivityManager.getActiveNetworkInfo();
            NetworkInfo mobNetInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
            if(activeNetInfo == null) networkStatus = "disconnect";
            else if(activeNetInfo.getType() == 1) networkStatus = "WIFI";
            else networkStatus = "LTE";

            //와이파이 여부 전달
            try {
                JSONObject obj = new JSONObject("{}");
                obj.put("isWifi", networkStatus=="WIFI");
                final String data = obj.toString();
                postToReact("isWifi", data);
            } catch (JSONException e) {
                e.printStackTrace();
            }

        // 네트워크 없을때 처리
        // Toast.makeText(context,"networkStatus : " + networkStatus , Toast.LENGTH_SHORT).show();
            if(networkStatus == "disconnect" && isNetworkInit == false){
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.mWebView.getContext());
                builder.setMessage("네트워크가 연결되어 있지 않습니다.\n앱이 정상적으로 동작하지 않을 수 있습니다.")
                        .setCancelable(false)
                       .setTitle("네트워크 없음")
                        .setPositiveButton("확인", new DialogInterface.OnClickListener()
                        {
                            @Override
                            public void onClick(DialogInterface dialog, int which)
                            {}
                        }).show();

            }else if(networkStatus == "disconnect"){
                // 앱진입시 (최초 1회 체크)
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.mWebView.getContext());
                            builder.setMessage("네트워크가 연결되어 있지 않습니다.\n앱을 종료합니다.")
                    .setCancelable(false)
                    .setTitle("네트워크 없음")
                    .setPositiveButton("종료", new DialogInterface.OnClickListener()
                    {
                        @Override
                        public void onClick(DialogInterface dialog, int which)
                        {
                            int pid = android.os.Process.myPid();
                            android.os.Process.killProcess(pid);
                        }
                    }).show();
            }else{
                isNetworkInit = false;
            }
        }
    }
}
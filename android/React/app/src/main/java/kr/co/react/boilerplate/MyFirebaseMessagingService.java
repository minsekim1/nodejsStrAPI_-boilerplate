package kr.co.react.boilerplate;

import static kr.co.react.boilerplate.MainActivity.postToReact;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Person;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.graphics.drawable.IconCompat;

import com.bumptech.glide.Glide;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;


public class MyFirebaseMessagingService extends FirebaseMessagingService {
    private static final String TAG = "MyFirebaseMsgService";
    private static int count = 0;
    public static final String NOTIFICATION_CHANNEL_ID = "10001";
    public static String messageRoomId = "null";

    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // TODO(developer): Handle FCM messages here.
        Log.d(TAG, "From: " + remoteMessage.getFrom());
        if (remoteMessage.getData().size() > 0) {
            Log.e(TAG, "Message data payload: " + remoteMessage.getData());
        }
        //  1. 일반 안드로이드 알림으로 띄우기
        onNotification(remoteMessage.getData());

    }
    /**
     * There are two scenarios when onNewToken is called:
     * 1) When a new token is generated on initial app startup
     * 2) Whenever an existing token is changed
     * Under #2, there are three scenarios when the existing token is changed:
     * A) App is restored to a new device
     * B) User uninstalls/reinstalls the app
     * C) User clears app data
     */
    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        Log.d(TAG, "Refreshed token: " + token);
        JSONObject obj = null;
        try {
            obj = new JSONObject("{}");
            obj.put("token", token);
            final String data = obj.toString();
            postToReact("deviceTokenUpdateToServer",data);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.P)
    public void onNotification(Map<String, String> data) {
        count++;
        NotificationManager notificationManager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);

        Intent notificationIntent = new Intent(this, MainActivity.class);

        notificationIntent.putExtra("type",data.get("type") ); //전달할 값
        notificationIntent.putExtra("id",data.get("id") ); //전달할 값
        notificationIntent.putExtra("notificationId", count); //전달할 값
        notificationIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK) ;
//        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent,  PendingIntent.FLAG_UPDATE_CURRENT);
                PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent,  PendingIntent.FLAG_IMMUTABLE);

        Bitmap image = null;
        try {
            InputStream in = new URL(data.get("image")).openStream();
            image = BitmapFactory.decodeStream(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Bitmap profile = null;
        try {
            InputStream in = new URL(data.get("profile")).openStream();
            profile = BitmapFactory.decodeStream(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        NotificationCompat.Builder builder = null;
        if(data.get("image").equals(data.get("profile"))){
            builder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
                    .setSmallIcon(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP ? R.drawable.ic_stat_name : R.mipmap.ic_launcher)
                    .setContentTitle(data.get("title"))//"상태바 드래그시 보이는 타이틀"
                    .setLargeIcon(profile)
                    .setContentText(data.get("body"))//"상태바 드래그시 보이는 서브타이틀"
                    .setContentIntent(pendingIntent) // 사용자가 노티피케이션을 탭시 MainActivity 이동하도록 설정
                    .setColor(0xffFFFFFF)
                    .setCategory(data.get("type"))
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                    .setAutoCancel(true)
                    .setStyle(new NotificationCompat.InboxStyle()
                        .addLine(data.get("body")));
        }else{
            builder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
            .setSmallIcon(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP ? R.drawable.ic_stat_name : R.mipmap.ic_launcher)
            .setContentTitle(data.get("title"))//"상태바 드래그시 보이는 타이틀"
            .setLargeIcon(profile)
            .setContentText(data.get("body"))//"상태바 드래그시 보이는 서브타이틀"
            .setContentIntent(pendingIntent) // 사용자가 노티피케이션을 탭시 MainActivity 이동하도록 설정
            .setColor(0xffFFFFFF)
            .setCategory(data.get("type"))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)

            .setStyle(new NotificationCompat.BigPictureStyle().bigPicture(image));
        }




        //OREO API 26 이상에서는 채널 필요
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            CharSequence channelName  = "채널01";
            int importance = NotificationManager.IMPORTANCE_HIGH;

            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, channelName , importance);
            channel.setDescription("채널01");
            channel.enableLights(true);
            channel.setLightColor(0xFFFFA54D);

            // 노티피케이션 채널을 시스템에 등록
            assert notificationManager != null;
            notificationManager.createNotificationChannel(channel);

        }else builder.setSmallIcon(R.mipmap.ic_launcher); // Oreo 이하에서 mipmap 사용하지 않으면 Couldn't create icon: StatusBarIcon 에러남

        assert notificationManager != null;
        if(!data.get("id").equals(messageRoomId)) {
            notificationManager.notify(count, builder.build()); // 고유숫자로 노티피케이션 동작시킴
            postToReact("onNotiPush",null);
            }

    }
}

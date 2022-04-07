package kr.co.react.boilerplate;

import android.Manifest;
import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DownloadManager;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Message;
import android.service.notification.StatusBarNotification;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.artjimlop.altex.AltexImageDownloader;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;
import com.kakao.sdk.common.KakaoSdk;
import com.kakao.sdk.user.UserApiClient;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import android.view.Window;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {
    public static WebView mWebView; // 웹뷰 선언
    public static WebView childView; // 웹뷰 선언
    private static final String ENTRY_URL = "http://172.30.1.13:3000";
//    private static final String ENTRY_URL = "https://www.naver.com/";
    private WebSettings mWebSettings; //웹뷰세팅
    private AlertDialog mAlertDialog; // 경고창을 띄울 Dialog
    private Context mContext; // (경고창Dialog)WebChromeClient를 호출한 Context


    private boolean RotateAble = false;
    private boolean BackAvailable = true;

    //네트워크 환경 실시간 체크 클래스
    BroadcastReceiver broadcastReceiver;
    NetworkStatusService networkStatusService;

    //FCM Notification
    private String NotiData = "";

    public static final int IMAGE_SELECTOR_REQ = 1;
    private ValueCallback mFilePathCallback;

    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (android.os.Build.VERSION.SDK_INT != Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
//        splashView = (RelativeLayout) findViewById(R.id.splashView);
        setContentView(R.layout.activity_main);
        // 앱 처음 진입시 네트워크 켜져있는지 실시간 이벤트 등록
        AppNetworkCheck();
        // FCM 서버키 등록을 위한 해시키
//          getHashKey();
        // FCM notification을 누르고 들어왔을때의 반응
        try {
            onEnterClickNoti();
        } catch (JSONException e) {
            e.printStackTrace();
        }


        // 웹뷰 시작
        mWebView = (WebView) findViewById(R.id.webView);
        mWebView.setWebViewClient(new WebViewClient()  {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("kakaolink:") || url.startsWith("market:")) {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);

                    return true;
                }if (url.startsWith("tel:") || url.startsWith("tel:")) {
                    Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse(url));
                    //전화거는 화면까지만 이동 시킬꺼면 Intent.ACTION_DIAL
                    //전화를 바로 걸라면 Intent.ACTION_CALL
                    startActivity(intent);
                }else {
                    view.loadUrl(url);
                }
                return true;
            }


        });
        mWebSettings = mWebView.getSettings();
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView newWebView = new WebView(MainActivity.this);
                WebSettings webSettings = newWebView.getSettings();
                webSettings.setJavaScriptEnabled(true);
                final Dialog dialog = new Dialog(MainActivity.this);
                dialog.setContentView(newWebView);
                dialog.show();
                newWebView.setWebChromeClient(new WebChromeClient() {
                    @Override
                    public void onCloseWindow(WebView window) {
                        dialog.dismiss();
                    } });
                ((WebView.WebViewTransport)resultMsg.obj).setWebView(newWebView);
                resultMsg.sendToTarget();
                return true; }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
                new AlertDialog.Builder(view.getContext())
                        .setTitle("title")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok,
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.confirm();
                                    }
                                })
                        .setNegativeButton(android.R.string.cancel,
                                new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.cancel();
                                    }
                                })
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }
            
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                        .setTitle("")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok, new AlertDialog.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                result.confirm();
                            } })
                        .setCancelable(false)
                        .create()
                        .show();

                return true;
//                return super.onJsAlert(view, url, message, result);
            }
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback filePathCallback, FileChooserParams fileChooserParams) {
                mFilePathCallback = filePathCallback;
                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);

                //여러장의 사진을 선택하는 경우 필요 <input type="file" multiple>
                intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false);

                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("image/*, video/*");

                startActivityForResult(Intent.createChooser(intent,"Select Picture"), IMAGE_SELECTOR_REQ);
                return true;
            }


        });
        //웹뷰 배경색 적용
        // mWebView.setBackgroundColor(Color.parseColor("#121212"));
        mWebSettings.setDomStorageEnabled(true); // 로컬저장소 허용 여부
        mWebSettings.setAppCacheEnabled(true);
        mWebSettings.setDatabaseEnabled(true);
        mWebSettings.setAllowContentAccess(true);
        mWebSettings.setAllowFileAccess(true);
        mWebSettings.setJavaScriptEnabled(true);
        mWebSettings.setSupportMultipleWindows(true); // 새창 띄우기 허용 여부 !!!!
        mWebSettings.setJavaScriptCanOpenWindowsAutomatically(true); // 자바스크립트 새창 띄우기(멀티뷰) 허용 여부 !!!!
        mWebSettings.setLoadWithOverviewMode(true); // 메타태그 허용 여부
        mWebSettings.setUseWideViewPort(true); // 화면 사이즈 맞추기 허용 여부
        mWebSettings.setSupportZoom(false); // 화면 줌 허용 여부
        mWebSettings.setBuiltInZoomControls(false); // 화면 확대 축소 허용 여부
        mWebSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL); // 컨텐츠 사이즈 맞추기
//        mWebSettings.setCacheMode(WebSettings.LOAD_DEFAULT .LOAD_NO_CACHE); // 브라우저 캐시 허용 여부


        mWebView.setScrollbarFadingEnabled(true); // 스크롤 페이딩 처리 여부
        mWebSettings.setLoadWithOverviewMode(true); // 컨텐츠가 웹뷰보다 클 경우 스크린 크기에 맞게 조정

        mWebView.addJavascriptInterface(new AndroidBridge(), "Android");
        mWebView.loadUrl(ENTRY_URL); // 웹뷰에 표시할 웹사이트 주소, 웹뷰 시작
    }
    // 소프트바 높이
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //뒤로가기 눌러서 사진 선택 중 취소했을 떄 null 로 교체
        if (resultCode != RESULT_OK)
        {
            mFilePathCallback.onReceiveValue(null);
            return;
        }
        if (requestCode == IMAGE_SELECTOR_REQ) {
            if (resultCode == Activity.RESULT_OK) {
                if (data.getClipData() != null) {
                    int count = data.getClipData().getItemCount();
                    Uri[] uris = new Uri[count];
                    for (int i = 0; i < count; i++)
                        uris[i] = data.getClipData().getItemAt(i).getUri();
                    mFilePathCallback.onReceiveValue(uris);
                } else if (data.getData() != null) {
                    mFilePathCallback.onReceiveValue(new Uri[]{data.getData()});
                }
            }
        }
    }

    public static void postToReact(String tag, String data) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.evaluateJavascript(
//                        "var event = new CustomEvent(\""+tag+"\");\n" +
                        "var event = new CustomEvent(\"" + tag + "\",{detail:" + data + "});\n" +
                                "window.dispatchEvent(event);\n"
                        , new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String value) {
                                Log.i(tag, "onReceiveValue: " + value + data);
                            }
                        });
            }
        });
    }

    @Override
    public void onBackPressed() {
        if (BackAvailable) {
            if (mWebView.canGoBack()) {
                mWebView.goBack();
            } else {
                super.onBackPressed();
            }
        } else {
            postToReact("androidBackhandle", null);
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (RotateAble) {
            if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
                setFullscreen(true);
            } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
                setFullscreen(false);
            }
        }
    }

    public class AndroidBridge {
        private String TAG = "AndroidBridge";

        // 로그를 띄우는 메소드 입니다.
        @JavascriptInterface
        public void log(final String _message) {
            try {
                JSONObject jObject = new JSONObject(_message);
                String title = jObject.getString("title");
                String body = jObject.getString("body");
                Log.e(TAG, title);
            } catch (JSONException e) {
                Log.e("JSON exception", "..");
            }
        }



        @JavascriptInterface
        public void postMessage(final String _message) {
            try {
                JSONObject jObject = new JSONObject(_message);
                String name = jObject.getString("name");
                String body = jObject.getString("body");
                //초기 설정 => 무조건 가로
                if (name.equals("rotateVertical")) {
                    setFullscreen(false);
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                } else if (name.equals("rotateHorizontal")) {
                    setFullscreen(true);
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
                } else if (name.equals("rotateAble")) {
                    RotateAble = true;
                } else if (name.equals("rotateEnable")) {
                    RotateAble = false;
                    setFullscreen(false);
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                } else if (name.equals("backAble")) {
                    Log.i(TAG, name);
                    BackAvailable = true;
                } else if (name.equals("backEnable")) {
                    Log.i(TAG, name);
                    BackAvailable = false;
                } else if (name.equals("finish")) {
                    finish();
                } else if (name.equals("linking")) {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(body));
                    startActivity(intent);
                } else if (name.equals("inChat")) {
                } else if (name.equals("outChat")) {
                } else if (name.equals("checkPermissionStorage")) {
                    //               권한 요청 됌. 단 기능 테스트중
                    // storage permission
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                                || checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                            if (shouldShowRequestPermissionRationale(Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
                            }
                            requestPermissions(new String[]
                                    {Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, 2);
                        }
                    }
                } else if (name.equals("loginKakao")) {
                    loginKakao();
                } else if (name.equals("deviceTokenUpdateToServer")) {
                    deviceTokenUpdateToServer();
                } else if (name.equals("getNotiData")) {
                    postToReact("getNotiData",NotiData);
                }else if (name.equals("isWifi")) {
                    Log.i("Network isWifi","isWifi called");
                    try {
                        JSONObject obj = new JSONObject("{}");
                        obj.put("isWifi", networkStatusService.networkStatus=="WIFI");
                        final String data = obj.toString();
                        postToReact("isWifi", data);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }else if (name.equals("setMessageRoomId")) {
                    //body : string | "null"
                    MyFirebaseMessagingService.messageRoomId = body;
                    if(!body.equals("null")) {
                        NotificationManager notiM = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
                        notiM.cancelAll();
                    }

                }else if (name.equals("downloadFile")) {
                    //body : string
                    String IMG = body;
                    AltexImageDownloader.writeToDisk(MainActivity.this, IMG, "IMAGES");
                }
                else if (name.equals("log")) {
                    Log.i("Log postMessage","name:"+name+"body:"+body);
                }



            } catch (JSONException e) {
                Log.e("JSON exception", "..");
            }
        }
    }
    public void setFullscreen(boolean fullscreen) {
        ActionBar actionBar = getSupportActionBar();
        if (fullscreen) {
            if (actionBar != null) actionBar.hide();
            // Hide Status Bar
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    getWindow().getDecorView().setSystemUiVisibility(
                            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                                    // Set the content to appear under the system bars so that the
                                    // content doesn't resize when the system bars hide and show.
//                                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                                    // Hide the nav bar and status bar
                                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    );
//                    int flag = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_FULLSCREEN;
//                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//                        flag |= View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION;
//                        flag |= View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
//                        flag |= View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
//                    }
//                    getWindow().getDecorView().setSystemUiVisibility(flag);
//                    getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
//                            | View.SYSTEM_UI_FLAG_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
//                    );
                }
            });
        } else {
            if (actionBar != null) actionBar.show();
            // Show Status Bar
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    getWindow().getDecorView().setSystemUiVisibility(View.STATUS_BAR_VISIBLE);
//                    int flag = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
//                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//                        flag |= View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION;
//                    }
//                    getWindow().getDecorView().setSystemUiVisibility(flag);
//                    getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
//                            | View.SYSTEM_UI_FLAG_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
//                    );
                }
            });
        }
    }
    public void loginKakao() {
        // Kakao Sdk 초기화
        String kakao_app_key = getResources().getString(R.string.kakao_app_key);
        KakaoSdk.init(this, kakao_app_key);

        if (UserApiClient.getInstance().isKakaoTalkLoginAvailable(this)) {
            // 카카오톡이 설치되어 있으면 카톡으로 로그인 확인 요청
            UserApiClient.getInstance().loginWithKakaoTalk(this, (token, loginError) -> {
                if (loginError != null) {
                    // 로그인 실패
                    Log.e("KAKAO", "ERROR 로그인 실패 1"+loginError.toString());
                } else {
                    // 로그인 성공
                    Log.i("KAKAO", "로그인 성공 2");
                    // 사용자 정보 요청
                    try {
                        JSONObject obj = new JSONObject("{}");
                        UserApiClient.getInstance().me((user, meError) -> {
                            try {
                                obj.put("id", user.getId().toString());
                                obj.put("user", user.toString());
                                obj.put("accessToken", token.getAccessToken());
                                obj.put("refreshToken", token.getRefreshToken());
                                obj.put("accessTokenExpiresAt", token.getAccessTokenExpiresAt());
                                obj.put("refreshTokenExpiresAt", token.getRefreshTokenExpiresAt());

                                final String data = obj.toString();
                                postToReact("loginKakao", data);

                                Log.i("KAKAO onPost loginKakao", data);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            return null;
                        });

                    } catch (JSONException e) {
                        Log.e("KAKAO JSON", "parsing error");
                    }
                }
                return null;
            });
        } else {
            // 카카오톡이 설치되어 있지 않은 경우 앱 내장 웹뷰 방식으로 카카오계정 확인 요청
            UserApiClient.getInstance().loginWithKakaoAccount(this, (token, loginError) -> {
                if (loginError != null) {
                    Log.e("KAKAO", "ERROR 로그인 웹뷰 실패 3");
                    // 로그인 실패
                } else {
                    // 로그인 성공
                    Log.i("KAKAO", "로그인 웹뷰 성공 4");
                    // 사용자 정보 요청
                    try {
                        JSONObject obj = new JSONObject("{}");
                        UserApiClient.getInstance().me((user, meError) -> {
                            try {
                                obj.put("id", user.getId().toString());
                                obj.put("user", user.toString());
                                obj.put("accessToken", token.getAccessToken());
                                obj.put("refreshToken", token.getRefreshToken());
                                obj.put("accessTokenExpiresAt", token.getAccessTokenExpiresAt());
                                obj.put("refreshTokenExpiresAt", token.getRefreshTokenExpiresAt());

                                final String data = obj.toString();
                                postToReact("loginKakao", data);

                                Log.i("KAKAO onPost loginKakao", data);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            return null;
                        });
                    } catch (JSONException e) {
                        Log.e("KAKAO JSON", "parsing error");
                    }
                }
                return null;
            });
        }
    }

    private void getHashKey(){
        PackageInfo packageInfo = null;
        try {
            packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        if (packageInfo == null)
            Log.e("KeyHash", "KeyHash:null");

        for (Signature signature : packageInfo.signatures) {
            try {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
            } catch (NoSuchAlgorithmException e) {
                Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
            }
        }
    }
    @SuppressLint("LongLogTag")
    private void deviceTokenUpdateToServer() throws JSONException {
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (!task.isSuccessful()) {
                            Log.w("firebase error", "Fetching FCM registration token failed", task.getException());
                            return;
                        }
                        // Get new FCM registration token
                        String token = task.getResult();
                        JSONObject obj = null;
                        try {
                            obj = new JSONObject("{}");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        try {
                            obj.put("token", token);
                        }catch (JSONException e) {
                            Log.e("deviceTokenUpdateToServer JSON", "parsing error");
                        }
                        final String data = obj.toString();
                        Log.i("firebase deviceToServer",data);
                        postToReact("deviceTokenUpdateToServer",data);
                    }
                });
    }
    private void onEnterClickNoti() throws JSONException {
        Bundle extras = getIntent().getExtras();
        int notificationId = 0;
        if (extras == null) {
            Log.d("FirebaseNotiEnter", "값을 전달 받는데 문제 발생");
        }
        else {
            JSONObject obj = new JSONObject("{}");
            try {
                notificationId = extras.getInt("notificationId");
                obj.put("notificationId",String.valueOf(extras.getInt("notificationId")) );
                obj.put("type", extras.getString("type"));
                obj.put("id", String.valueOf(extras.getString("id")));
                obj.put("isPush", "true");
                NotiData = obj.toString();
            }catch (JSONException e) {
                Log.e("onEnterClickNoti JSON", "parsing error");
            }
        }
        NotificationManager notificationManager =  (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        //노티피케이션 제거
        notificationManager.cancel(notificationId);
    }
    private void AppNetworkCheck() {
        // 이벤트 등록(실시간체크)        
        broadcastReceiver = new NetworkStatusService();
        networkStatusService =  new NetworkStatusService();
        IntentFilter mIFNetwork = new IntentFilter();
        mIFNetwork.addAction(android.net.ConnectivityManager.CONNECTIVITY_ACTION); //"android.net.conn.CONNECTIVITY_CHANGE"
        registerReceiver(broadcastReceiver, mIFNetwork);
    }

    public static void cancelNotification(Context context, int notifyId, int summeryId) {
        NotificationManager notificationManager = (NotificationManager) context
                .getSystemService(Context.NOTIFICATION_SERVICE);

        boolean cancelSummary = false;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N && summeryId != 0) {
            StatusBarNotification[] statusBarNotifications = notificationManager.getActiveNotifications();
            String groupKey = null;

            for (StatusBarNotification statusBarNotification : statusBarNotifications) {
                if (notifyId == statusBarNotification.getId()) {
                    groupKey = statusBarNotification.getGroupKey();
                    break;
                }
            }

            int counter = 0;
            for (StatusBarNotification statusBarNotification : statusBarNotifications) {
                if (statusBarNotification.getGroupKey().equals(groupKey)) {
                    counter++;
                }
            }

            if (counter == 2) {
                cancelSummary = true;
            }
        }

        if (cancelSummary) {
            notificationManager.cancel(summeryId);
        } else {
            notificationManager.cancel(notifyId);
        }
    }
}

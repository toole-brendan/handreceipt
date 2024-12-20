package com.handreceipt;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import java.util.ArrayList;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages = new ArrayList<>(packages);
      for (int i = packages.size() - 1; i >= 0; i--) {
        ReactPackage p = packages.get(i);
        if (p.getClass().getName().contains("RNCameraPackage")) {
          packages.remove(i);
        }
      }
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected String getBundleAssetName() {
      return "index.android.bundle";
    }

    @Override
    protected boolean isNewArchEnabled() {
      return false;
    }

    @Override
    protected Boolean isHermesEnabled() {
      return true;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
    if (false) {
      DefaultNewArchitectureEntryPoint.load();
    }
  }
} 
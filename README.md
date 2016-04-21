# ios项目中添加其他工程
### 比如react-native-toast：
   1、首先npm install react-native-toast --save
   2、然后xcode点击打开你创建的项目比如githubNotetaker里的ios目录下的githubNotetaker.xcodeproj
   3、右击Libraries会出现各种选项点击Add files to "githubNotetaker"...
   4、然后找到node_modules文件夹下的react-native-toast对应的.xcodeproj项目添加
   5、最后在点击xcode中的githubNotetaker这个根目录，点击Build Phases,在Link Binary With Libraries中点击“+”加号，添加libRCTToast.a。

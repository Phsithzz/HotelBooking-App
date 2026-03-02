import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_hotel_room_app/service/app_unity.dart';
import 'package:my_hotel_room_app/service/helper_api.dart';

class RoomFormController extends GetxController {
  TextEditingController nameCustomer = TextEditingController();
  TextEditingController telCustomer = TextEditingController();

  Rx<DateTimeRange> dateRange = DateTimeRange(
    start: DateTime.now(),
    end: DateTime.now(),
  ).obs;

Future<void> saveRoom(List roomId) async {
  try {
    String checkin = AppUnity.dateFormatSend(
      date: AppUnity.dateFormat(date: dateRange.value.start),
    );

    String checkout = AppUnity.dateFormatSend(
      date: AppUnity.dateFormat(date: dateRange.value.end),
    );

    for (int i = 0; i < roomId.length; i++) {
      bool isRentCheck = await isRent(
        roomId[i],
        checkin,
        checkout,
      );

      if (!isRentCheck) {
        AppUnity.myShowSnackBar(
          context: Get.context!,
          text: "ห้องนี้ถูกจองแล้ว",
          typeDialog: TypeDialog.error,
        );
        return;
      }
    }

    await HelperApi().httpPost(
      path: "/roomRent/rent",
      data: jsonEncode({
        "customerName": nameCustomer.text,
        "customerPhone": telCustomer.text,
        "checkinDate": checkin,
        "checkoutDate": checkout,
        "rooms": roomId,
      }),
    );

    Get.back(result: true);
  } catch (err) {
    AppUnity.myShowSnackBar(
      context: Get.context!,
      text: err.toString(),
      typeDialog: TypeDialog.error,
    );
  }
}

Future<bool> isRent(int roomId, String checkin, String checkout) async {
  try {
    var body = await HelperApi().httpPost(
      path: "/roomRent/isRent",
      data: jsonEncode({
        "roomId": roomId,
        "checkinDate": checkin,
        "checkoutDate": checkout,
      }),
    );

    List listcheckroom = body["results"];

    return listcheckroom.isEmpty;
  } catch (err) {
    rethrow;
  }
}
}

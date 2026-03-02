import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_hotel_room_app/controller/room_form_controller.dart';
import 'package:my_hotel_room_app/service/app_unity.dart';
import 'package:flutter/services.dart';

class RoomForm extends StatefulWidget {
  final List<int> roomId;
  const RoomForm({super.key, required this.roomId});

  @override
  State<RoomForm> createState() => _RoomFormState();
}

class _RoomFormState extends State<RoomForm> {
  final controller = Get.put(RoomFormController());

  final Color navy = const Color(0xFF0F2854);
  final Color primary = const Color(0xFF1C4D8D);
  final Color accent = const Color(0xFF4988C4);
  final Color light = const Color(0xFFBDE8F5);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: light.withOpacity(0.2),

      appBar: AppBar(
        elevation: 0,
        title: const Text(
          "กรอกรายละเอียดการจอง",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [navy, primary],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Material(
            elevation: 6,
            borderRadius: BorderRadius.circular(20),
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: Colors.white,
              ),
              child: Column(
                children: [
                  TextFormField(
                    controller: controller.nameCustomer,
                    decoration: _inputDecoration(
                      label: "ชื่อผู้จอง",
                      icon: Icons.person,
                    ),
                  ),

                  const SizedBox(height: 18),

                  TextFormField(
                    controller: controller.telCustomer,
                    keyboardType: TextInputType.phone,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    decoration: _inputDecoration(
                      label: "เบอร์โทร",
                      icon: Icons.phone,
                    ),
                  ),

                  const SizedBox(height: 18),

                  Obx(
                    () => GestureDetector(
                      onTap: () async {
                        DateTimeRange? dateTimeRange =
                            await AppUnity.showDatePickerRang(
                              context: context,
                              currentDate: controller.dateRange.value.start,
                              dateTimeRange: controller.dateRange.value,
                              lastDate: DateTime.now().add(
                                const Duration(days: 365 * 10),
                              ),
                            );

                        if (dateTimeRange != null) {
                          controller.dateRange.value = dateTimeRange;
                        }
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 18,
                        ),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: accent.withOpacity(0.5)),
                          color: light.withOpacity(0.2),
                        ),
                        child: Row(
                          children: [
                            Icon(Icons.date_range, color: primary),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                "${AppUnity.dateFormat(date: controller.dateRange.value.start)} - ${AppUnity.dateFormat(date: controller.dateRange.value.end)}",
                                style: TextStyle(
                                  color: navy,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),

      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: primary.withOpacity(0.2),
              blurRadius: 10,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: SizedBox(
          height: 55,
          child: ElevatedButton(
            onPressed: () {
              controller.saveRoom(widget.roomId);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: primary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
              elevation: 4,
            ),
            child: const Text(
              "บันทึกการจอง",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration({
    required String label,
    required IconData icon,
  }) {
    return InputDecoration(
      labelText: label,
      prefixIcon: Icon(icon),
      filled: true,
      fillColor: Colors.grey.shade100,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide(color: primary, width: 2),
      ),
    );
  }
}

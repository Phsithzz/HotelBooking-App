import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_hotel_room_app/controller/home_page_controller.dart';
import 'package:my_hotel_room_app/screens/room_form.dart';
import 'package:my_hotel_room_app/screens/room_image.dart';
import 'package:my_hotel_room_app/service/app_unity.dart';

class HomPage extends StatefulWidget {
  const HomPage({super.key});

  @override
  State<HomPage> createState() => _HomPageState();
}

class _HomPageState extends State<HomPage> {
  final controller = Get.put(HomePageController());

  final Color navy = const Color(0xFF0F2854);
  final Color primary = const Color(0xFF1C4D8D);
  final Color accent = const Color(0xFF4988C4);
  final Color light = const Color(0xFFBDE8F5);

  @override
  void initState() {
    super.initState();
    controller.getAllRoom();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: light.withOpacity(0.2),

      appBar: AppBar(
        elevation: 0,
        title: const Text(
          "รายการห้อง",
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

      body: Obx(
        () => ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: controller.roomList.value.results?.length ?? 0,
          itemBuilder: (context, index) {
            final e = controller.roomList.value.results![index];

            return Container(
              margin: const EdgeInsets.only(bottom: 14),
              child: Material(
                borderRadius: BorderRadius.circular(18),
                elevation: 4,
                child: InkWell(
                  borderRadius: BorderRadius.circular(18),
                  onTap: () {
                    Get.to(() => RoomImage(roomListModel: e));
                  },
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(18),
                      gradient: LinearGradient(
                        colors: [Colors.white, light.withOpacity(0.4)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Row(
                      children: [
                        Checkbox(
                          value: e.check ?? false,
                          activeColor: primary,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(4),
                          ),
                          onChanged: (val) {
                            e.check = val;
                            controller.roomList.refresh();
                            controller.update();
                          },
                        ),
                        const SizedBox(width: 12),

                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                e.name ?? "",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: navy,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                "${AppUnity.f(text: e.price ?? 0)} บาท",
                                style: TextStyle(
                                  fontSize: 15,
                                  color: accent,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),

                        Icon(
                          Icons.arrow_forward_ios,
                          size: 16,
                          color: accent,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),

      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: primary,
        elevation: 6,
        icon: const Icon(Icons.book),
        label: const Text("จองห้อง"),
        onPressed: () {
          if ((controller.roomList.value.results ?? [])
              .where((e) => e.check ?? false)
              .toList()
              .isEmpty) {
            AppUnity.myShowSnackBar(
              context: context,
              text: "กรุณาเลือกห้องพัก",
              typeDialog: TypeDialog.warning,
            );
            return;
          }

          Get.to(
            () => RoomForm(
              roomId: (controller.roomList.value.results ?? [])
                  .where((e) => e.check ?? false)
                  .map((e) => e.id ?? 0)
                  .toList(),
            ),
          )!.then((val) {
            if (val != null) {
              AppUnity.myShowSnackBar(
                context: context,
                text: "จองสำเร็จ",
                typeDialog: TypeDialog.success,
              );
              controller.getAllRoom();
            }
          });
        },
      ),
    );
  }
}
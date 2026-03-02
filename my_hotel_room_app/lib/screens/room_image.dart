import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_hotel_room_app/controller/room_image_controller.dart';
import 'package:my_hotel_room_app/model/room_list_model.dart';
import 'package:my_hotel_room_app/service/app_unity.dart';

class RoomImage extends StatefulWidget {
  const RoomImage({super.key, required this.roomListModel});
  final Result roomListModel;

  @override
  State<RoomImage> createState() => _RoomImageState();
}

class _RoomImageState extends State<RoomImage> {
  final controller = Get.put(RoomImageController());

  final Color navy = const Color(0xFF0F2854);
  final Color primary = const Color(0xFF1C4D8D);
  final Color accent = const Color(0xFF4988C4);
  final Color light = const Color(0xFFBDE8F5);

  @override
  void initState() {
    controller.getImageData(widget.roomListModel.id ?? 0);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: light.withOpacity(0.2),

      appBar: AppBar(
        elevation: 0,
        title: Text(
          "รูปห้องพัก ${widget.roomListModel.name}",
          style: const TextStyle(fontWeight: FontWeight.bold),
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

      body: Obx(() {
        final images = controller.imageData.value.results ?? [];

        if (images.isEmpty) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }

        return GridView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: images.length,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 14,
            mainAxisSpacing: 14,
            childAspectRatio: 1,
          ),
          itemBuilder: (context, index) {
            final e = images[index];

            return GestureDetector(
              onTap: () {
                _showFullImage(
                  context,
                  "http://10.0.2.2:3000/uploads/${e.name}",
                );
              },
              child: Hero(
                tag: e.name ?? index,
                child: Material(
                  elevation: 6,
                  borderRadius: BorderRadius.circular(18),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(18),
                    child: Image.network(
                      "http://10.0.2.2:3000/uploads/${e.name}",
                      fit: BoxFit.cover,
                      loadingBuilder: (context, child, progress) {
                        if (progress == null) return child;
                        return Container(
                          color: Colors.grey.shade200,
                          child: const Center(
                            child: CircularProgressIndicator(),
                          ),
                        );
                      },
                      errorBuilder: (context, error, stackTrace) =>
                          Image.network(
                        AppUnity.urlNoImage,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              ),
            );
          },
        );
      }),
    );
  }

  void _showFullImage(BuildContext context, String imageUrl) {
    showDialog(
      context: context,
      builder: (_) => Dialog(
        backgroundColor: Colors.black,
        insetPadding: const EdgeInsets.all(10),
        child: Stack(
          children: [
            InteractiveViewer(
              child: Image.network(
                imageUrl,
                fit: BoxFit.contain,
              ),
            ),
            Positioned(
              right: 10,
              top: 10,
              child: IconButton(
                icon: const Icon(Icons.close, color: Colors.white),
                onPressed: () => Get.back(),
              ),
            )
          ],
        ),
      ),
    );
  }
}
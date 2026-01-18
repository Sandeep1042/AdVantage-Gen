import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function EditorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Your Ad</h1>
              <p className="text-gray-600">Fine-tune and customize your generated ad</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="border-2 border-dashed border-gray-200 rounded-lg relative bg-gray-50 min-h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                      Your Ad Preview
                    </div>
                    <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80">
                      <i className="fas fa-image text-gray-400 text-2xl"></i>
                    </div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl font-bold text-gray-900">
                      Shop Now →
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button onClick={() => navigate("/create")} className="flex-1 btn-secondary text-white py-3 rounded-lg font-semibold flex items-center justify-center">
                    <i className="fas fa-sync-alt mr-2"></i>
                    Remix
                  </button>
                  <button className="flex-1 btn-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center">
                    <i className="fas fa-download mr-2"></i>
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Generated Copy</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Primary Text</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Experience sustainable luxury with our eco-friendly bamboo coffee cups. Perfect for your daily commute! ☕🌿
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Hashtags</p>
                    <p className="text-sm text-green-700 mt-1">
                      #EcoFriendly #SustainableLiving #CoffeeLover #ZeroWaste #GreenLife
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Campaign Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform</span>
                    <span className="font-medium text-gray-900">Instagram</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tone</span>
                    <span className="font-medium text-gray-900">Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aspect Ratio</span>
                    <span className="font-medium text-gray-900">Square (1:1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium text-gray-900">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../AxiosApi";
import { TextField, Button } from "@mui/material";


const EditAd = () => {
    const { id } = useParams();  // Получаем id из URL
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Проверяем, что id доступен
    useEffect(() => {
        console.log("Полученный ID из URL:", id); // Логируем id для проверки

        if (!id) {
            setError("ID объявления не найдено!");
            return;
        }

        // Функция для загрузки объявления
        const fetchAd = async () => {
            try {
                const response = await api.get(`ads/${id}.json`);
                console.log("Ответ от API:", response);  // Логируем ответ от API

                if (response.data) {
                    // Если данные есть, заполняем состояние
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                    setImageUrl(response.data.imageUrl);
                } else {
                    setError("Объявление не найдено");
                }
            } catch (error) {
                setError("Ошибка загрузки объявления");
                console.error("Ошибка при загрузке объявления:", error);
            }
        };

        fetchAd();
    }, [id]);  // Повторно загружаем данные, если id изменится

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !price || !imageUrl) {
            setError("Заполните все поля!");
            return;
        }

        if (isNaN(parseFloat(price))) {
            setError("Цена должна быть числом!");
            return;
        }

        setLoading(true);
        setError("");  // Сбрасываем ошибку

        try {
            await api.put(`ads/${id}.json`, {
                title,
                description,
                price: parseFloat(price),
                imageUrl,
            });

            alert("Объявление обновлено!");
            navigate(`/ad/${id}`);  // Перенаправляем на страницу объявления
        } catch (err) {
            setError("Ошибка при обновлении объявления!");
            console.error("Ошибка при обновлении:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Container">
            <h2>Редактировать объявление</h2>
            {/* Если ошибка при загрузке, показываем сообщение */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Если данные еще не загружены, показываем сообщение о загрузке */}
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    <>
                        <TextField
                            label="Название"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Описание"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Цена"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Ссылка на изображение"
                            variant="outlined"
                            fullWidth
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button variant="contained" type="submit" disabled={loading}>
                            {loading ? "Изменение..." : "Редактировать объявление"}
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
};

export default EditAd;

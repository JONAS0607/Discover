function collide(s1, s2) {
	var hit = false;
	//calcula a distancia entre o centro dos sprites
	var vetX = s1.center_x() - s2.center_x();
	var vetY = s1.center_y() - s2.center_y();
	// soma das metades
	var sum_half_w = s1.half_w() + s2.half_w();
	var sum_half_h = s1.half_h() + s2.half_h();
	//verifica se houve colisão

	if (Math.abs(vetX) < sum_half_w && Math.abs(vetY) < sum_half_h) {
		hit = true;
	}
	return hit;
}
